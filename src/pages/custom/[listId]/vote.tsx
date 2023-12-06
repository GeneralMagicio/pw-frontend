// import { changePercentage } from '@/components/Poll/Rankings/edit-logic/project-editing'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { axiosInstance } from '@/utils/axiosInstance'
import { PairType } from '@/types/Pairs/Pair'
import { getListMetadataPtrUids } from '@/components/Poll/Rankings/OverallRankingRow/attest-utils'
import Modal from '@/components/Modal/Modal'
import { Footer } from '@/components/Poll/Pair/Footer/Footer'
import { Question } from '@/components/Poll/Pair/Question'
import { Pairs } from '@/components/Poll/Pairs'
// import { RankingConfirmationModal } from '@/components/RankingConfirmationModal'
import { Header } from '@/components/Poll/Pair/Header'

import { PairsType } from '@/types/Pairs'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import Confetti from 'react-confetti'
import { useAccount } from 'wagmi'
import { generateZeroMatrix, getRankingForSetOfDampingFactors, getRankingStorageKey, makeIt100, sortProjectId } from '../../../components/Custom/utils'
import { RankingConfirmationModal } from '../../../components/Custom/RankingConfirmationModal'
import { ProjectRanking } from '@/components/Poll/Rankings/edit-logic/edit'
import { HalfwayConfirmationModal } from '../../../components/Custom/HalfwayConfirmationModal'

interface Vote {
  p1Id: number
  p2Id: number
  picked: number | null
}

const getTwoLeastOccuredProjects = (occurances: Record<number, number>) => {
  const keys = Object.keys(occurances).map((el) => Number(el))
  let first,
    second = 0
  if (occurances[keys[0]] <= occurances[keys[1]]) {
    first = keys[0]
    second = keys[1]
  } else {
    first = keys[1]
    second = keys[0]
  }

  for (let i = 2; i < keys.length; i++) {
    const key = keys[i]
    if (occurances[key] < occurances[second]) {
      if (occurances[key] < occurances[first]) {
        second = first
        first = key
      } else second = key
    }
  }

  return [first, second]
}

const checkIfVoteExists = (votes: Vote[], p1: number, p2: number) => {
  const [id1, id2] = sortProjectId(p1, p2)
  const found = votes.find((item) => item.p1Id === id1 && item.p2Id === id2)

  return !!found
}

const getNextPair = (votes: Vote[], projects: PairType[]) => {
  const occurances: Record<number, number> = {}
  // const keys = Object.keys(occurances).map((el) => Number(el))
  for (const project of projects) {
    occurances[project.id] = 0
  }
  const total = projects.length

  for (const vote of votes) {
    occurances[vote.p1Id] = occurances[vote.p1Id] + 1
    occurances[vote.p2Id] = occurances[vote.p2Id] + 1
  }

  let count = 0
  const numOfPossibleVotes = (votes.length * (votes.length - 1)) / 2
  while (count <= numOfPossibleVotes) {
    let first = projects[Math.floor(Math.random() * total)].id
    let second = projects[Math.floor(Math.random() * total)].id
    while (second === first) {
      second = projects[Math.floor(Math.random() * total)].id
    }
    // const [first, second] = getTwoLeastOccuredProjects(occurances)
    if (!checkIfVoteExists(votes, first, second)) {
      return [first, second]
    }
    count++
  }

  return null
}

const fetchPairs = async (projects: PairType[], votes: Vote[]) => {
  const total = (projects.length * (projects.length - 1)) / 2
  const metadata: PairsType = {
    totalPairs: total,
    votedPairs: votes.length,
    threshold: 0.05,
    pairs: [],
    type: 'expertise',
    name: 'Custom',
  }
  const res = getNextPair(votes, projects)

  if (res === null) return { ...metadata }


  const first = projects.find((el) => el.id === res[0])
  const second = projects.find((el) => el.id === res[1])

  if (!first || !second) throw new Error("Shouldn't this happen")
  return { ...metadata, pairs: [[first, second]] }
}

const voteProjects = async (
  votes: Vote[],
  p1: number,
  p2: number,
  picked: number | null
): Promise<Vote[]> => {
  return new Promise((res, rej) =>
    setTimeout(() => res([...votes, { p1Id: p1, p2Id: p2, picked }]), 150)
  )
}


const mapProjectToIndex = (projectIds: number[], id: number) => {
  return projectIds.sort().findIndex((el) => el === id)
}

const mapIndexToProject = (projectIds: number[], index: number) => {
  return projectIds.sort()[index]
}

const convertVotesToMatrix = (votes: Vote[], projects: PairType[]) => {
  const matrix = generateZeroMatrix(projects.length)
  const ids = projects.map((el) => el.id)
  for (const vote of votes) {
    const i1 = mapProjectToIndex(ids, vote.p1Id)
    const i2 = mapProjectToIndex(ids, vote.p2Id)
    if (vote.picked === null) continue;
    else if (vote.picked === vote.p1Id) {
      matrix[i1][i2] = 1
    } 
    else if (vote.picked === vote.p2Id) {
      matrix[i2][i1] = 1
    } 
  }

  return matrix;
}

const calculateRanking = (votes: Vote[], projects: PairType[]) : ProjectRanking[] => {

  const matrix = convertVotesToMatrix(votes, projects);
  const ranking = getRankingForSetOfDampingFactors(matrix)
  const projectIds = projects.map((item) => item.id)

  const result = ranking.map((el, index) => {
    const projectId = mapIndexToProject(projectIds, index)
    const project = projects.find((item) => item.id === projectId)

    return {
      RPGF3Id: project!.RPGF3Id,
      name: project!.name,
      share: el,
      id: project!.id,
      type: "project" as const,
      hasRanking: false as const,
      isTopLevel: false as const,
    }}).sort((a, b) => b.share - a.share)

  return makeIt100(result)

}

export default function VotePage({
  projects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  let votes = useRef<Vote[]>([])

  const router = useRouter()
  // const cid = router.query.cid
  const listId = router.query.listId as (string | undefined)

  const [pairs, setPairs] = useState<PairsType | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isHalfwayConfirmOpen, setIsHalfwayConfirmOpen] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState('')
  const { address } = useAccount()

  const total = pairs?.totalPairs ?? 1
  const voted = pairs?.votedPairs ?? 0
  const threshold = pairs?.threshold ?? 1

  const handleFinish = () => {
    router.push(`/custom/${listId}/ranking`)
  }

  const fetchData = async () => {
    const data = await fetchPairs(projects, votes.current)
    console.log('data:', data)
    if (!data.pairs.length) {
      return Promise.reject(handleFinish())
    }
    setPairs(data)
  }

  const saveResult = () => {
    if (!address || !listId) return;
    const ranking = calculateRanking(votes.current, projects)
    window.localStorage.setItem(getRankingStorageKey(listId, address), JSON.stringify(ranking))
  }

  const handleFinishVoting = () => {
    saveResult()
    setIsConfirmOpen(true)
  }

  useEffect(() => {
    setActiveQuestion('Which project should receive more RetroPGF funding?')
  }, [pairs])

  useEffect(() => {
    fetchData().then(() => setOpen(true))
  }, [])

  useEffect(() => {
    if (!pairs) return

    if (pairs.votedPairs === Math.ceil(pairs.totalPairs / 2)) {
      setIsHalfwayConfirmOpen(true)
    }
  }, [pairs])

  const onVote = async (pair: PairType[], picked?: number | undefined) => {
    if (!pairs) return

    const [a, b] = pair
    const [id1, id2] = sortProjectId(a.id, b.id)
    votes.current = await voteProjects(
      votes.current,
      id1,
      id2,
      picked || null
    )

    saveResult()

    await fetchData()
  }

  return (
    <>
      <Header
        handleFinishVoting={handleFinishVoting}
        name={pairs?.name || ''}
        question={activeQuestion}
        total={voted < Math.ceil(total / 2) ? Math.ceil(total / 2) : total}
        voted={voted}
        minVotesToUnlock={Math.ceil(total * threshold)}
      />

      {pairs?.pairs && (
        <Pairs
          activeIndex={pairs.votedPairs + 1}
          onVote={onVote}
          pairs={pairs.pairs}
        />
      )}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Question onStart={() => setOpen(false)} question={activeQuestion} />
      </Modal>
      {pairs && listId && (
        <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
          <RankingConfirmationModal
            listId={listId}
            handleFinish={handleFinish}
            collection={{
              id: -1,
              impactDescription: 'Custom list created by Pairwise',
              name: 'Custom list',
            }}
          />
        </Modal>
      )}
      {pairs && isHalfwayConfirmOpen && listId && (
        <>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <Modal
            isOpen={isHalfwayConfirmOpen}
            closeOnOutsideClick={false}
            onClose={() => setIsHalfwayConfirmOpen(false)}>
            <HalfwayConfirmationModal
              listId={listId}
              handleClose={() => setIsHalfwayConfirmOpen(false)}
            />
          </Modal>
        </>
      )}

      <Footer
        onBack={() => router.back()}
        // The condition checks for top-level collections pairwises
        text={
          pairs?.pairs[0][0].collection_id !== null && pairs?.name
            ? pairs.name
            : ''
        }
      />
    </>
  )
}

export const getServerSideProps = (async (context) => {
  const listId = context.params?.listId as string

  console.log('listId', listId)

  if (!listId) return { notFound: true }

  const uids = await getListMetadataPtrUids(
    listId,
    'https://optimism.easscan.org/graphql'
  )

  const res = await axiosInstance.post('/flow/custom/projects', {
    uids,
  })

  const projects = res.data as PairType[]

  return { props: { projects } }
}) satisfies GetServerSideProps<{
  projects: PairType[]
}>

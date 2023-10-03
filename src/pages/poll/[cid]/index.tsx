import { useEffect, useState } from 'react'
import Modal from '@/components/Modal/Modal'
import { Question } from '@/components/Poll/Pair/Question'
import { Pairs } from '@/components/Poll/Pairs'
import { Header } from '@/components/Poll/Pair/Header'
import { Footer } from '@/components/Poll/Pair/Footer/Footer'
import {
  fetchPairs,
  fetchSubProjectPairs,
  voteColletions,
  voteExpertise,
  voteProjects,
  voteSubProjects,
} from '@/utils/poll'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'
import { PairsType, PollType } from '@/types/Pairs'
import { ImpactModal } from '@/components/Journey/ImpactModal'
import { PairType } from '@/types/Pairs/Pair'

export default function Poll() {
  const router = useRouter()
  const cid = router.query.cid
  const type = router.query.type
  const [pairs, setPairs] = useState<PairsType | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const [showImpactModal, setShowImpactModal] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState('')
  const { isConnected } = useAccount()

  const goToRanking = () => {
    switch (cid) {
      case PollType.EXPERTISE:
        router.push('/poll/expertise/ranking')
        return
      case PollType.IMPACT:
        router.push('/poll/root/ranking')
        return
      default:
        router.push({
          pathname: `${router.pathname}/ranking`,
          query: router.query,
        })
    }
  }

  const fetchData = async () => {
    if (type === "super") {
      const data = await fetchSubProjectPairs(String(cid))
      if (!data.pairs.length) {
        return Promise.reject(goToRanking())
      }
      setPairs(data)
    } else {
      const data = await fetchPairs(String(cid))
      if (!data.pairs.length) {
        return Promise.reject(goToRanking())
      }
      setPairs(data)
    }
  }

  useEffect(() => {
    if (router.query.cid === 'root') {
      setShowImpactModal(true)
    }
  }, [router.query.cid])

  useEffect(() => {
    if (pairs?.type === 'collection') {
      setActiveQuestion(
        'Since RetroPGF 2, which of these collections has had a greater positive impact on Optimism?'
      )
    } else if (pairs?.type === 'expertise') {
      setActiveQuestion('What area do you feel most confident discussing?')
    } else if (pairs?.type === 'project')
      setActiveQuestion(
        'Since RetroPGF 2, which of these projects has had a greater positive impact on Optimism?'
      )
    else if (pairs?.type === 'sub project')
      setActiveQuestion(
        'Since RetroPGF 2, which of these projects has had a greater positive impact on Optimism?'
      )
  }, [pairs])

  useEffect(() => {
    if (isConnected && router.query.cid) {
      fetchData().then(() => setOpen(true))
    }
  }, [isConnected, router.query])

  const onVote = async (pair: PairType[], picked?: number | undefined) => {
    if (!pairs) return 

    const [a, b] = pair
    const voteRequestsMap = {
      collection: voteColletions,
      project: voteProjects,
      expertise: voteExpertise,
      ['sub project']: voteSubProjects,
    }
    const voteRequest = voteRequestsMap[pairs?.type]
    await voteRequest({
      id1: a.id,
      id2: b.id,
      pickedId: picked || null,
    })

    await fetchData()
  }

  return (
    <>
      <Header
        canFinish={
          pairs?.votedPairs
            ? pairs?.votedPairs / pairs?.totalPairs >= pairs?.threshold
            : false
        }
        collectionTitle={pairs?.collectionTitle || ''}
        handleFinishVoting={goToRanking}
        question={activeQuestion}
        threshold={pairs?.threshold || 0}
        total={pairs?.totalPairs || 0}
        voted={pairs?.votedPairs}
      />

      {pairs?.pairs && (
        <Pairs
          activeIndex={pairs.votedPairs + 1}
          onVote={onVote}
          pairs={pairs.pairs}
        />
      )}
      {showImpactModal ? (
        <ImpactModal isOpen={showImpactModal} onClose={() => {setShowImpactModal(false); setOpen(false)}} />
      ) : (
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <Question onStart={() => setOpen(false)} question={activeQuestion} />
        </Modal>
      )}

      <Footer
        onBack={() => router.back()}
        // The condition checks for top-level collections pairwises
        text={
          pairs?.pairs[0][0].collection_id !== null && pairs?.collectionTitle
            ? `Evaluating ${pairs.collectionTitle}`
            : ''
        }
      />
    </>
  )
}

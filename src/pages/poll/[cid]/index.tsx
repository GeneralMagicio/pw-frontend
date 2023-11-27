import { fetchPairs, voteProjects } from '@/utils/poll'
import { useEffect, useState } from 'react'

import { Footer } from '@/components/Poll/Pair/Footer/Footer'
import { Header } from '@/components/Poll/Pair/Header'
import Modal from '@/components/Modal/Modal'
import { PairType } from '@/types/Pairs/Pair'
import { Pairs } from '@/components/Poll/Pairs'
import { PairsType } from '@/types/Pairs'
import { Question } from '@/components/Poll/Pair/Question'
import { useAccount } from 'wagmi'
import Confetti from 'react-confetti'
import { useRouter } from 'next/router'
import { RankingConfirmationModal } from '@/components/RankingConfirmationModal'
import { HalfwayConfirmationModal } from '@/components/RankingConfirmationModal/HalfwayConfirmationModal'

export default function Poll() {
  const router = useRouter()
  const cid = router.query.cid
  const [pairs, setPairs] = useState<PairsType | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isHalfwayConfirmOpen, setIsHalfwayConfirmOpen] = useState(false)
  // const [showImpactModal, setShowImpactModal] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState('')
  const { isConnected } = useAccount()

  const goToRanking = () => {
    router.push(`/ranking?c=${cid}`)
  }

  const fetchData = async () => {
    const data = await fetchPairs(String(cid))
    if (!data.pairs.length) {
      return Promise.reject(goToRanking())
    }
    setPairs(data)
  }

  // useEffect(() => {
  //   if (router.query.cid === 'root') {
  //     setShowImpactModal(true)
  //   }
  // }, [router.query.cid])

  useEffect(() => {
    // if (pairs?.type === 'collection') {
    //   setActiveQuestion(
    //     'Since RetroPGF 2, which of these collections has had a greater positive impact on Optimism?'
    //   )
    // } else if (pairs?.type === 'expertise') {
    //   setActiveQuestion('What area do you feel most confident discussing?')
    // } else if (pairs?.type === 'project')
    //   setActiveQuestion(
    //     'Since RetroPGF 2, which of these projects has had a greater positive impact on Optimism?'
    //   )
    // else if (pairs?.type === 'sub project')
    //   setActiveQuestion(
    //     'Since RetroPGF 2, which of these projects has had a greater positive impact on Optimism?'
    //   )
    // if (pairs?.type === 'expertise') {
    //   setActiveQuestion('What area do you feel most confident discussing?')
    // }
    setActiveQuestion('Which project should receive more RetroPGF funding?')
  }, [pairs])

  useEffect(() => {
    if (isConnected && router.query.cid) {
      fetchData().then(() => setOpen(true))
    }
  }, [isConnected, router.query])

  useEffect(() => {
    if (!pairs) return

    if (pairs.votedPairs === Math.ceil(pairs.totalPairs / 2)) {
      setIsHalfwayConfirmOpen(true)
    }
  }, [pairs])

  const onVote = async (pair: PairType[], picked?: number | undefined) => {
    if (!pairs) return

    const [a, b] = pair
    await voteProjects({
      id1: a.id,
      id2: b.id,
      pickedId: picked || null,
    })

    await fetchData()
  }

  const canFinish = pairs?.votedPairs
    ? pairs?.votedPairs / pairs?.totalPairs >= pairs?.threshold
    : false

  return (
    <>
      <Header
        canFinish={canFinish}
        handleFinishVoting={() => setIsConfirmOpen(true)}
        name={pairs?.name || ''}
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
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Question onStart={() => setOpen(false)} question={activeQuestion} />
      </Modal>
      {pairs && (
        <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
          <RankingConfirmationModal />
        </Modal>
      )}
      {pairs && isHalfwayConfirmOpen && (
        <>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <Modal
            isOpen={isHalfwayConfirmOpen}
            closeOnOutsideClick={false}
            onClose={() => setIsHalfwayConfirmOpen(false)}>
            <HalfwayConfirmationModal handleClose={() => setIsHalfwayConfirmOpen(false)}/>
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

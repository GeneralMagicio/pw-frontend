import { useEffect, useState } from 'react'
import Modal from '@/components/Modal/Modal'
import { Question } from '@/components/Poll/Pair/Question'
import { Pairs } from '@/components/Poll/Pairs'
import { Header } from '@/components/Poll/Pair/Header'
import { Footer } from '@/components/Poll/Pair/Footer/Footer'
import { fetchPairs, voteColletions, voteProjects } from '@/utils/poll'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'
import { PairsType } from '@/types/Pairs'

export default function Poll() {
  const router = useRouter()
  const [pairs, setPairs] = useState<PairsType | undefined>(undefined)
  const [open, setOpen] = useState(true)
  const [activeQuestion, setActiveQuestion] = useState(
    'Which of these two projects created more value for Optimism since last March?'
  )
  const [activeCollection, setActiveCollection] = useState('Collection X')
  const { isConnected } = useAccount()

  useEffect(() => {
    const { votedPairs, totalPairs } = pairs || {}
    if (
      votedPairs &&
      totalPairs &&
      votedPairs > 1 &&
      votedPairs === totalPairs
    ) {
      finish()
    }
  }, [pairs?.totalPairs, pairs?.votedPairs])

  useEffect(() => {
    if (isConnected) fetchPairs(router.query.cid).then(setPairs)
  }, [isConnected, router.query])

  const finish = () => {
    router.push({
      pathname: `${router.pathname}/ranking`,
      query: router.query,
    })
  }

  return (
    <>
      <Header
        canFinish={
          pairs?.votedPairs
            ? pairs?.votedPairs / pairs?.totalPairs >= pairs?.threshold
            : false
        }
        handleFinishVoting={finish}
        question={activeQuestion}
        total={pairs?.totalPairs}
        voted={pairs?.votedPairs}
      />

      {pairs?.pairs && (
        <Pairs
          onVote={(pair, picked) => {
            const [a, b] = pair
            const voteRequest =
              pairs?.type === 'collection' ? voteColletions : voteProjects
            return voteRequest({
              id1: a.id,
              id2: b.id,
              pickedId: picked || null,
            }).then(() => {
              fetchPairs(router.query.cid).then((data) => {
                if (data)
                  setPairs({ ...data, pairs: [...pairs.pairs, ...data.pairs] })
              })
            })
          }}
          pairs={pairs.pairs}
        />
      )}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Question
          onStart={() => setOpen(false)}
          question={activeQuestion}
          title="Question"
        />
      </Modal>

      <Footer collectionName={activeCollection} onBack={() => router.back()} />
    </>
  )
}

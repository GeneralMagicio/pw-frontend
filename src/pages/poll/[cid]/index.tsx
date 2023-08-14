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
  const [open, setOpen] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(
    'Since last March, which of these projects has had a greater positive impact on Optimism?'
  )
  const { isConnected } = useAccount()

  const goToRanking = () =>
    router.push({
      pathname: `${router.pathname}/ranking`,
      query: router.query,
    })
  const fetchData = (rest?: boolean) =>
    fetchPairs(String(router.query.cid)).then((data) => {
      if (!data.pairs.length) {
        return Promise.reject(goToRanking())
      }
      const newPairs = [...(pairs ? pairs.pairs : []), ...data.pairs]
      setPairs(rest ? data : { ...data, pairs: newPairs })
      return newPairs
    })

  useEffect(() => {
    if (pairs?.type === "collection") {
      setActiveQuestion('Since last March, which of these collections has had a greater positive impact on Optimism?')
    }
  }, [pairs])

  useEffect(() => {
    if (isConnected && router.query.cid) {
      fetchData(true).then(() => setOpen(true))
    }
  }, [isConnected, router.query])

  return (
    <>
      <Header
        canFinish={
          pairs?.votedPairs
            ? pairs?.votedPairs / pairs?.totalPairs >= pairs?.threshold
            : false
        }
        collectionTitle={pairs?.collectionTitle || ""}
        handleFinishVoting={goToRanking}
        question={activeQuestion}
        threshold={pairs?.threshold || 0}
        total={pairs?.totalPairs || 0}
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
            }).then(fetchData)
          }}
          pairs={pairs.pairs}
        />
      )}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Question
          onStart={() => setOpen(false)}
          question={activeQuestion}
        />
      </Modal>

      <Footer
        onBack={() => router.back()}
        // The condition checks for top-level collections pairwises
        text={pairs?.pairs[0][0].collection_id !== null ? `Evaluating ${pairs?.collectionTitle}` : ""}
      />
    </>
  )
}

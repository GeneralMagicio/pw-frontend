import { useEffect, useState } from 'react'
import Modal from '@/components/Modal/Modal'
import { Question } from '@/components/Pair/Question'
import { Pairs } from '@/components/Pairs'
import { Header } from '@/components/Pair/Header'
import { Footer } from '@/components/Pair/Footer/Footer'
import { fetchPairs, voteProjects } from '@/utils/poll'
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
    if (isConnected && router.query.cid)
      fetchPairs(Number(router.query.cid) || 1).then(setPairs)
  }, [isConnected, router.query])

  return (
    <>
      <Header
        handleFinishVoting={() => {}}
        question={activeQuestion}
        total={pairs?.totalPairs}
        voted={pairs?.votedPairs}
      />

      {pairs?.pairs && (
        <Pairs
          onVote={(pair, picked) => {
            const [a, b] = pair
            return voteProjects({
              project1Id: a.id,
              project2Id: b.id,
              pickedId: picked || null,
            }).then(() => {
              fetchPairs(Number(router.query.cid) || 1).then((data) => {
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

      <Footer collectionName={activeCollection} onBack={() => {}} />
    </>
  )
}

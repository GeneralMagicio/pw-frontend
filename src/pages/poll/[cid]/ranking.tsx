import { FinishVoteModal } from '@/components/FinishVoteModal'
import Modal from '@/components/Modal/Modal'
import { Rankings } from '@/components/Poll/Rankings'
import { RankingHeader } from '@/components/Ranking/RankingHeader'
import { RankingResponse } from '@/types/Ranking/index'
import { getRankings } from '@/utils/poll'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function RankingPage() {
  const router = useRouter()
  const [rankings, setRankings] = useState<RankingResponse>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (router.query.cid)
      getRankings(String(router.query.cid)).then(setRankings)
  }, [router.query.cid, setRankings])

  return (
    <>
      <RankingHeader onDone={() => setOpen(true)} onEdit={() => {}}/>
      {rankings?.nextCollection && (
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <FinishVoteModal nextCollection={rankings?.nextCollection} />
        </Modal>
      )}
      <Rankings
        collectionTitle={rankings?.collectionTitle || ''}
        items={rankings?.ranking || []}
      />
    </>
  )
}

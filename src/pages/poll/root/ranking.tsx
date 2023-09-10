import { WellDoneModal2 } from '@/components/Journey/WellDoneModal2'
import { Rankings } from '@/components/Poll/Rankings'
import { RankingHeader } from '@/components/Ranking/RankingHeader'
import { useSession } from '@/context/session'
import { RankingResponse } from '@/types/Ranking/index'
import { getRankings } from '@/utils/poll'
import { useEffect, useState } from 'react'

export default function RankingPage() {
  const [rankings, setRankings] = useState<RankingResponse>()
  const [open, setOpen] = useState(false)
  const { updateFlowStatus } = useSession()
  
  useEffect(() => {
    const main = async () => {
      const data = await getRankings('root')
      setRankings(data)
    }
    main()
  }, [setRankings])


  useEffect(() => {
    updateFlowStatus()
  }, [updateFlowStatus])

  
  return (
    <>
      <RankingHeader onDone={() => {setOpen(true)}} onEdit={() => {}} />
      <WellDoneModal2 isOpen={open} onClose={() => {setOpen(false)}} />
      <Rankings
        collectionTitle={rankings?.collectionTitle || ''}
        items={rankings?.ranking || []}
      />
    </>
  )
}

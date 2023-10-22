import { WellDoneModal } from '@/components/Journey/WellDoneModal'
import { Rankings } from '@/components/Poll/Rankings'
import { RankingHeader } from '@/components/Ranking/RankingHeader'
import { RankingResponse } from '@/types/Ranking/index'
import { getExpertiseRankings } from '@/utils/poll'
import { useEffect, useState } from 'react'

export default function RankingPage() {
  const [rankings, setRankings] = useState<RankingResponse>()

  useEffect(() => {
    const main = async () => {
      const data = await getExpertiseRankings()
      setRankings(data)
    }
    main()
  }, [setRankings])

  return (
    <>
      <RankingHeader onDone={() => {}} onEdit={() => {}}/>
      <WellDoneModal isOpen={true} onClose={() => {}}/>
      <Rankings
        items={rankings?.ranking || []}
        name={rankings?.name || ''}
      />
    </>
  )
}

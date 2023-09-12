import { OverallRanking } from '@/components/Poll/Rankings/OverallRanking'
import { RankingHeader } from '@/components/Ranking/RankingHeader'
import { OverallRankingType } from '@/types/Ranking/index'
import { getOverallRanking } from '@/utils/poll'
import { useEffect, useState } from 'react'

export default function RankingPage() {
  const [rankings, setRankings] = useState<OverallRankingType[]>()
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    const main = async () => {
      const data = await getOverallRanking()
      setRankings(data.sort((a, b) => b.votingPower - a.votingPower))
    }
    main()
  }, [setRankings])


  
  return (
    <>
      <RankingHeader onDone={() => {setOpen(true)}} onEdit={() => {}} />
      {/* <WellDoneModal2 isOpen={open} onClose={() => {setOpen(false)}} /> */}
      <OverallRanking
        data={rankings || []}
      />
    </>
  )
}

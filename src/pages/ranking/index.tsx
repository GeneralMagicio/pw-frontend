import { OverallRanking } from '@/components/Poll/Rankings/OverallRanking'
import { OverallRankingHeader } from '@/components/Poll/Rankings/OverallRankingRow/OverallRankingHeader'
import { OverallRankingType } from '@/types/Ranking/index'
import { getOverallRanking } from '@/utils/poll'
import { useEffect, useState } from 'react'

export default function RankingPage() {
  const [rankings, setRankings] = useState<OverallRankingType[]>()
  
  useEffect(() => {
    const main = async () => {
      const data = await getOverallRanking()
      setRankings(data.sort((a, b) => b.votingPower - a.votingPower))
    }
    main()
  }, [setRankings])


  
  return (
    <>
      <OverallRankingHeader onDone={() => {}} onEdit={() => {}} />
      <OverallRanking
        data={rankings || []}
      />
    </>
  )
}

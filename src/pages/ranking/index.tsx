import {
  OverallRanking,
  hasSubcollections,
} from '@/components/Poll/Rankings/OverallRanking'
import { AttestationModal } from '@/components/Poll/Rankings/OverallRankingRow/AttestationModal'
import { OverallRankingHeader } from '@/components/Poll/Rankings/OverallRankingRow/OverallRankingHeader'
import { OverallRankingType, Ranking } from '@/types/Ranking/index'
import { getOverallRanking } from '@/utils/poll'
import { useEffect, useState } from 'react'
import { useChainId, useSwitchNetwork } from 'wagmi'

const flattenRankingData = (ranking: OverallRankingType[]): Ranking[] => {
  return ranking.reduce((acc, item) => {
    if (hasSubcollections(item.ranking)) {
      return [...acc, ...flattenRankingData(item.ranking)]
    } else return [...acc, ...item.ranking]
  }, [] as Ranking[])
}

export default function RankingPage() {
  const [rankings, setRankings] = useState<OverallRankingType[]>()
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    const main = async () => {
      const data = await getOverallRanking()
      setRankings(data.sort((a, b) => b.votingPower - a.votingPower))
    }
    main()
  }, [setRankings])

  return (
    <>
      <OverallRankingHeader onDone={() => {setOpen(true)}} onEdit={() => {}} />
      {isOpen && <AttestationModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        ranking={rankings ? flattenRankingData(rankings) : []}
      />}
      <OverallRanking data={rankings || []} />
    </>
  )
}
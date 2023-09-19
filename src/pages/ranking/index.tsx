import {
  OverallRanking,
  hasSubcollections,
} from '@/components/Poll/Rankings/OverallRanking'
import { AttestationModal } from '@/components/Poll/Rankings/OverallRankingRow/AttestationModal'
import { OverallRankingHeader } from '@/components/Poll/Rankings/OverallRankingRow/OverallRankingHeader'
import { addLockedProperty, changePercentage } from '@/components/Poll/Rankings/edit-logic'
import { changeCollectionPercentage } from '@/components/Poll/Rankings/edit-logic/collection-editing'
import { OverallRankingType, Rank } from '@/types/Ranking/index'
import { getOverallRanking } from '@/utils/poll'
import { useEffect, useState } from 'react'
import { useChainId, useSwitchNetwork } from 'wagmi'

const flattenRankingData = (ranking: OverallRankingType[]): Rank[] => {
  return ranking.reduce((acc, item) => {
    if (hasSubcollections(item.ranking)) {
      return [...acc, ...flattenRankingData(item.ranking)]
    } else return [...acc, ...item.ranking]
  }, [] as Rank[])
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


  const change = () => {
    if (!rankings) return;
    const editRanking = addLockedProperty(rankings)
    const newRanking = changeCollectionPercentage(editRanking, 5, 0.3)

    console.log("new Ranking:", newRanking)
  }

  return (
    <>
      <OverallRankingHeader onDone={() => {change(); setOpen(true)}} onEdit={() => {}} />
      {isOpen && <AttestationModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        ranking={rankings ? flattenRankingData(rankings) : []}
      />}
      <OverallRanking data={rankings || []} />
    </>
  )
}

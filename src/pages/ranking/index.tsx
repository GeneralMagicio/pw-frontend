import {
  OverallRanking,
  hasSubcollections,
} from '@/components/Poll/Rankings/OverallRanking'
import { AttestationModal } from '@/components/Poll/Rankings/OverallRankingRow/AttestationModal'
import { OverallRankingHeader } from '@/components/Poll/Rankings/OverallRankingRow/OverallRankingHeader'
import { addLockedProperty } from '@/components/Poll/Rankings/edit-logic'
import { EditingOverallRankingType, OverallRankingType, Rank } from '@/types/Ranking/index'
import { getOverallRanking } from '@/utils/poll'
import { useEffect, useState } from 'react'

const flattenRankingData = (ranking: OverallRankingType[]): Rank[] => {
  return ranking.reduce((acc, item) => {
    if (hasSubcollections(item.ranking)) {
      return [...acc, ...flattenRankingData(item.ranking)]
    } else return [...acc, ...item.ranking]
  }, [] as Rank[])
}

export default function RankingPage() {
  const [rankings, setRankings] = useState<EditingOverallRankingType[]>()
  const [editMode, setEditMode] = useState(false)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    const main = async () => {
      const data = await getOverallRanking()
      setRankings(addLockedProperty(data.sort((a, b) => b.votingPower - a.votingPower)))
    }
    main()
  }, [setRankings])

  return (
    <>
      <OverallRankingHeader onDone={() => {setOpen(true)}} onEdit={() => {setEditMode(!editMode)}} />
      {isOpen && <AttestationModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        ranking={rankings ? flattenRankingData(rankings) : []}
      />}
      {rankings && <OverallRanking editMode={editMode} initialData={rankings} />}
    </>
  )
}

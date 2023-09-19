import { EditingOverallRankingType, OverallRankingType, Rank } from '@/types/Ranking/index'
import { OverallRankingHeader, OverallRankingRow } from './OverallRankingRow'
import { useState } from 'react'
import { changeCollectionPercentage } from './edit-logic/collection-editing'
import { changePercentage } from './edit-logic'
import cloneDeep from 'lodash.clonedeep'

interface RankingsProps {
  initialData: EditingOverallRankingType[]
}

export const hasSubcollections = (
  input: OverallRankingType[] | Rank[]
): input is OverallRankingType[] => {
  if ('votingPower' in input[0]) return true
  return false
}

interface Props {
  data: OverallRankingType
  children?: React.ReactNode
  onEditChange: (type: "project" | "collection", id: number) => (newValue: number) => void
}

const Rows: React.FC<Props> = ({ data, onEditChange }): any => {
  if (hasSubcollections(data.ranking)) {
    return (
      <OverallRankingHeader
        data={{
          id: data.id,
          name: data.collectionTitle,
          share: data.votingPower,
        }}
        onEditChange={onEditChange("collection", data.id)}>
        {data.ranking.map((item) => (
          <Rows
            data={item}
            key={item.id}
            onEditChange={onEditChange}
          />
        ))}
      </OverallRankingHeader>
    )
  }

  return (
    <>
      <OverallRankingHeader
        data={{
          id: data.id,
          name: data.collectionTitle,
          share: data.votingPower,
        }}
        onEditChange={onEditChange("collection", data.id)}>
        {data.ranking.map(({ name, id, share }) => (
          <OverallRankingRow
            data={{ name, share, id }}
            key={id}
            onEditChange={onEditChange("project", id)}
          />
        ))}
      </OverallRankingHeader>
    </>
  )
}

export const OverallRanking: React.FC<RankingsProps> = ({ initialData }) => {
  
  const [data, setData] = useState(initialData)

  const edit = (type: "project" | "collection", id: number) => (newValue: number) => {
    console.log("type:", type, "id:", id, "new value:", newValue)
    if (type === "collection") {
      const newRanking = changeCollectionPercentage(data, id, newValue)
      setData(cloneDeep(newRanking))
    }
    else if (type === "project") {
      const newRanking = changePercentage(data, id, newValue)
      console.log("new ranking:", newRanking)
      setData(cloneDeep([...newRanking]))
    }
  }  

  return (
  <div className="container relative mx-auto mt-8 mb-32 flex min-w-[1200px] grow flex-col items-end gap-1 px-16">
    <div className="flex w-full items-center gap-6 rounded-md border-b border-b-gray-10 bg-white/[.2] px-6  py-4 font-Inter text-black">
      <span className="ml-10 grow text-sm">Project</span>
      <span className=" w-40 text-sm">{`Budget Allocation`}</span>
      <span className="w-[215px]  text-sm">OP Received</span>
    </div>
    {data.map((ranking) => (
      <Rows data={ranking} key={ranking.id} onEditChange={edit}/>
    ))}
  </div>
)}

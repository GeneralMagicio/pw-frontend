import {
  EditingOverallRankingType,
  OverallRankingType,
  Rank,
} from '@/types/Ranking/index'
import { OverallRankingHeader, OverallRankingRow } from './OverallRankingRow'
import { useState } from 'react'
import { changeCollectionPercentage } from './edit-logic/collection-editing'
import { changePercentage, isEditingRank, validateRanking } from './edit-logic'
import cloneDeep from 'lodash.clonedeep'

interface RankingsProps {
  initialData: EditingOverallRankingType[]
  editMode: boolean;
}

const changeProjectLockStatus = (
  input: EditingOverallRankingType[],
  id: number
): EditingOverallRankingType[] => {
  const data = cloneDeep(input)
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (isEditingRank(item.ranking[0])) {
      const index = item.ranking.findIndex((el) => el.id === id)
      if (index !== -1) {
        item.ranking[index].locked = !item.ranking[index].locked
        return data
      }
    } else {
      item.ranking = changeProjectLockStatus(
        item.ranking as EditingOverallRankingType[],
        id
      )
    }
  }

  return data
}

const changeCollectionLockStatus = (
  input: EditingOverallRankingType[],
  id: number
): EditingOverallRankingType[] => {
  const data = cloneDeep(input)
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item.id === id) {
      item.locked = !item.locked
      return data
    } else if (!isEditingRank(item.ranking[0])) {
      item.ranking = changeCollectionLockStatus(
        item.ranking as EditingOverallRankingType[],
        id
      )
    }
  }

  return data
}

export const hasSubcollections = (
  input: OverallRankingType[] | Rank[]
): input is OverallRankingType[] => {
  if ('votingPower' in input[0]) return true
  return false
}

interface Props {
  data: EditingOverallRankingType
  children?: React.ReactNode
  editMode: boolean
  onLockClick: (id: number, type: 'project' | 'collection') => () => void,
  onEditChange: (
    type: 'project' | 'collection',
    id: number
  ) => (newValue: number) => void
}

const Rows: React.FC<Props> = ({ data, onEditChange, onLockClick, editMode }): any => {
  if (hasSubcollections(data.ranking)) {
    return (
      <OverallRankingHeader
        data={{
          id: data.id,
          name: data.collectionTitle,
          share: data.votingPower,
          locked: data.locked
        }}
        editMode={editMode}
        onEditChange={onEditChange('collection', data.id)}
        onLockClick={onLockClick(data.id, "collection")}>
        {data.ranking.map((item) => (
          <Rows  data={item} editMode={editMode} key={item.id} onEditChange={onEditChange} onLockClick={onLockClick} />
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
          locked: data.locked
        }}
        editMode={editMode}
        onEditChange={onEditChange('collection', data.id)}
        onLockClick={onLockClick(data.id, "collection")}>
        {data.ranking.map(({ name, id, share, locked }) => (
          <OverallRankingRow
            data={{ name, share, id, locked }}
            editMode={editMode}
            key={id}
            onEditChange={onEditChange('project', id)}
            onLockClick={onLockClick(id, "project")}
          />
        ))}
      </OverallRankingHeader>
    </>
  )
}

export const OverallRanking: React.FC<RankingsProps> = ({ initialData, editMode }) => {
  const [data, setData] = useState(initialData)

  const edit =
    (type: 'project' | 'collection', id: number) => (newValue: number) => {
      if (type === 'collection') {
        const newRanking = changeCollectionPercentage(data, id, newValue)
        if (validateRanking(newRanking)) setData(newRanking)
      } else if (type === 'project') {
        const newRanking = changePercentage(data, id, newValue)
        if (validateRanking(newRanking)) setData(newRanking)
      }
    }

  const changeLockStatus = (id: number, type: 'project' | 'collection') => () => {
    console.log("id:", id, "type:", type)
    if (type === "project") {
      console.log(changeProjectLockStatus(data, id))
      setData(changeProjectLockStatus(data, id))
    }
    else if (type === "collection") setData(changeCollectionLockStatus(data, id))
  }

  return (
    <div className="container relative mx-auto mt-8 mb-32 flex min-w-[1200px] grow flex-col items-end gap-1 px-16">
      <div className="flex w-full items-center gap-6 rounded-md border-b border-b-gray-10 bg-white/[.2] px-6  py-4 font-Inter text-black">
        <span className="ml-10 grow text-sm">Project</span>
        <span className=" w-40 text-sm">{`Budget Allocation`}</span>
        <span className="w-[215px]  text-sm">OP Received</span>
      </div>
      {data.map((ranking) => (
        <Rows data={ranking} editMode={editMode} key={ranking.id} onEditChange={edit} onLockClick={changeLockStatus} />
      ))}
    </div>
  )
}

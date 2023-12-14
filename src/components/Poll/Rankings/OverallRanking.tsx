import { useEffect, useState } from 'react'
import { EditingCollectionRanking } from './edit-logic/edit'
import { OverallRankingHeader, OverallRankingRow } from './OverallRankingRow'
import { fetchCollections } from '../../../utils/flow'
import { PairType } from '../../../types/Pairs/Pair'
import { fetchPairs } from '../../../utils/poll'
import { PairsType } from '../../../types/Pairs'
import { useRouter } from 'next/router'

interface RankingsProps {
  data: EditingCollectionRanking
  totalPercentage: number
  editMode: boolean
  edit: Props['onEditChange']
  changeLockStatus: Props['onLockClick']
}

interface Props {
  collection?: PairType
  data: EditingCollectionRanking
  children?: React.ReactNode
  editMode: boolean
  level?: number
  onLockClick: (id: number) => () => void
  onEditChange: (id: number) => (newValue: number) => void
}

const Rows: React.FC<Props> = ({
  collection,
  data,
  level = 1,
  onEditChange,
  onLockClick,
  editMode,
}) => {
  const router = useRouter()
  const [childCollections, setChildCollections] = useState<PairType[]>()
  const [pairs, setPairs] = useState<PairsType>()

  useEffect(() => {
    // Only fetch child collections if we are at the top level
    if (level !== 1 || !data) return
    ;(async () => {
      setChildCollections(await fetchCollections(data.id.toString()))
    })()
  }, [data, level])

  useEffect(() => {
    if (
      collection?.progress !== 'WIP' &&
      collection?.progress !== 'WIP - Threshold'
    )
      return
    ;(async () => {
      setPairs(await fetchPairs(collection?.id.toString()))
    })()
  }, [collection])

  const getCollection = (id: number) => {
    if (!childCollections) return
    return childCollections.find((collection) => collection.id === id)
  }
  const expanded =
    data.id === Number(router.query.c) ||
    data.ranking.some((r) => r.id === Number(router.query.c))

  return (
    <OverallRankingHeader
      collection={collection}
      data={data}
      editMode={editMode}
      expanded={expanded || data.expanded || false}
      level={level}
      onEditChange={onEditChange(data.id)}
      onLockClick={onLockClick(data.id)}
      pairs={pairs}>
      {data.ranking.map((item) => {
        if (item.type === 'project') {
          return (
            <OverallRankingRow
              data={item}
              editMode={editMode}
              key={item.id}
              onEditChange={onEditChange(item.id)}
              onLockClick={onLockClick(item.id)}
            />
          )
        } else if (item.hasRanking)
          return (
            <Rows
              collection={getCollection(item.id)}
              data={item}
              editMode={editMode}
              key={item.id}
              level={level + 1}
              onEditChange={onEditChange}
              onLockClick={onLockClick}
            />
          )
      })}
    </OverallRankingHeader>
  )
}

export const OverallRanking: React.FC<RankingsProps> = ({
  data,
  editMode,
  edit,
  changeLockStatus,
  totalPercentage,
}) => {
  return (
    <div className="container relative mx-auto mb-32 mt-8 flex min-w-[1200px] grow flex-col items-end px-16">
      <div className="mb-2 flex w-full items-center gap-6 rounded-md px-6 py-4 text-black ">
        <span className="grow text-sm" />
        <span className="flex w-64 justify-end text-sm ">OP Allocated</span>
        <span className="flex w-20 justify-end text-sm">%</span>
        <span className="w-8" />
      </div>
      {/* <Rows
        data={data}
        editMode={editMode}
        key={data.id}
        onEditChange={edit}
        onLockClick={changeLockStatus}
      /> */}
      {data.ranking.map((ranking) => {
        if (ranking.type !== 'project' && ranking.hasRanking)
          return (
            <Rows
              data={ranking}
              editMode={editMode}
              key={ranking.id}
              level={1}
              onEditChange={edit}
              onLockClick={changeLockStatus}
            />
          )
        else
          return (
            <div className="w-full">
              <OverallRankingRow
                data={ranking}
                editMode={editMode}
                key={ranking.id}
                onEditChange={edit(ranking.id)}
                onLockClick={changeLockStatus(ranking.id)}
              />
            </div>
          )
      })}
    </div>
  )
}

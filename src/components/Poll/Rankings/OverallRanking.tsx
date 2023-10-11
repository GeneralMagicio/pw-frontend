import { OverallRankingHeader, OverallRankingRow } from './OverallRankingRow'
import {
  EditingCollectionRanking,
  EditingProjectRanking,
} from './edit-logic/edit'
// import { isEditingProjectRanking } from './edit-logic/utils'

interface RankingsProps {
  data: EditingCollectionRanking
  editMode: boolean
  edit: Props['onEditChange']
  changeLockStatus: Props['onLockClick']
}


interface Props {
  data: EditingCollectionRanking
  children?: React.ReactNode
  editMode: boolean
  onLockClick: (id: number) => () => void
  onEditChange: (id: number) => (newValue: number) => void
}

const Rows: React.FC<Props> = ({
  data,
  onEditChange,
  onLockClick,
  editMode,
}) => {
  return (
    <OverallRankingHeader
      data={{
        id: data.id,
        name: data.name,
        share: data.share,
        locked: data.locked,
        error: data.error,
      }}
      editMode={editMode}
      expanded={data.expanded || false}
      onEditChange={onEditChange(data.id)}
      onLockClick={onLockClick(data.id)}>
      {data.ranking.map((item) => {
        if (item.type === 'project') {
          return (
            <OverallRankingRow
              data={{
                name: item.name,
                share: item.share,
                id: item.id,
                locked: item.locked,
                error: item.error,
              }}
              editMode={editMode}
              key={item.id}
              onEditChange={onEditChange(item.id)}
              onLockClick={onLockClick(item.id)}
            />
          )
        } else
          return (
            <Rows
              data={item}
              editMode={editMode}
              key={item.id}
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
}) => {
  return (
    <div className="container relative mx-auto mt-8 mb-32 flex min-w-[1200px] grow flex-col items-end gap-1 px-16">
      <div className="flex w-full items-center gap-6 rounded-md border-b border-b-gray-10 bg-white/[.2] px-6  py-4 font-Inter text-black">
        <span className="grow text-sm">Project</span>
        <span className=" w-40 text-sm">{`Budget Allocation`}</span>
        <span className="w-[215px]  text-sm">OP Received</span>
      </div>
      {/* <Rows
        data={data}
        editMode={editMode}
        key={data.id}
        onEditChange={edit}
        onLockClick={changeLockStatus}
      /> */}
      {data.ranking.map((ranking) => {
        if (ranking.type !== 'project')
          return (
            <Rows
              data={ranking}
              editMode={editMode}
              key={ranking.id}
              onEditChange={edit}
              onLockClick={changeLockStatus}
            />
          )
        else
          return (
            <div className='w-full'>
              <OverallRankingRow
                data={{
                  name: ranking.name,
                  share: ranking.share,
                  id: ranking.id,
                  locked: ranking.locked,
                  error: ranking.error,
                }}
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

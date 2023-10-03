import {
  EditingOverallRankingType,
  OverallRankingType,
  Rank,
} from '@/types/Ranking/index'
import { OverallRankingHeader, OverallRankingRow } from './OverallRankingRow'

interface RankingsProps {
  data: EditingOverallRankingType[]
  editMode: boolean;
  edit: Props['onEditChange'];
  changeLockStatus: Props['onLockClick'];
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
          locked: data.locked,
          error: data.error
        }}
        editMode={editMode}
        expanded={data.expanded || false}
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
          locked: data.locked,
          error: data.error
        }}
        editMode={editMode}
        expanded={data.expanded || false}
        onEditChange={onEditChange('collection', data.id)}
        onLockClick={onLockClick(data.id, "collection")}>
        {data.ranking.map(({ name, id, share, locked, error }) => (
          <OverallRankingRow
            data={{ name, share, id, locked, error }}
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

export const OverallRanking: React.FC<RankingsProps> = ({ data, editMode, edit, changeLockStatus }) => {

  return (
    <div className="container relative mx-auto mt-8 mb-32 flex min-w-[1200px] grow flex-col items-end gap-1 px-16">
      <div className="flex w-full items-center gap-6 rounded-md border-b border-b-gray-10 bg-white/[.2] px-6  py-4 font-Inter text-black">
        <span className="grow text-sm">Project</span>
        <span className=" w-40 text-sm">{`Budget Allocation`}</span>
        <span className="w-[215px]  text-sm">OP Received</span>
      </div>
      {data.map((ranking) => (
        <Rows data={ranking} editMode={editMode} key={ranking.id} onEditChange={edit} onLockClick={changeLockStatus} />
      ))}
    </div>
  )
}
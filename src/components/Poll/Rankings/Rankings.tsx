import { Move } from '@/components/Icon/Move'
import { RankingRow } from './RankingRow'
import { RankingsType } from '@/types/Ranking/index'

interface RankingsProps {
  items: RankingsType
  collectionTitle: string,
}

export const Rankings: React.FC<RankingsProps> = ({ items, collectionTitle }) => (
  <div className="container relative mx-auto mt-8 flex min-w-[1200px] gap-10 px-16">
    <div className="flex grow flex-col gap-2">
      <div className="flex items-center gap-6 border-b border-b-gray-10  px-6 py-3 font-IBM text-black">
        <Move className="opacity-0" />
        <span className="grow text-xs font-bold">Project</span>
        <span className=" w-[300px] text-xs font-bold">{`${collectionTitle} Budget Allocation`}</span>
        <span className="w-36  text-xs font-bold">OP Received</span>
      </div>
      {items.map((ranking) => (
        <RankingRow data={ranking} key={ranking.project.id} />
      ))}
    </div>
    <div
      className="rounded-xl bg-gray-60 p-4 shadow-card backdrop-blur-lg "
      hidden>
      <h4 className="font-IBM font-medium text-black">
        OP allocation for [Project name]
      </h4>
    </div>
  </div>
)

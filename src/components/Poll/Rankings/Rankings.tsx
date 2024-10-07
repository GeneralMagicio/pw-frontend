import { Move } from '@/components/Icon/Move'
import { RankingRow } from './RankingRow'
import { RankingsType } from '@/types/Ranking/index'

interface RankingsProps {
  items: RankingsType
  name: string
}

export const Rankings: React.FC<RankingsProps> = ({ items, name }) => (
  <div className="container relative mx-auto mt-8 flex min-w-[1200px] gap-10 px-16">
    <div className="flex flex-col gap-2 grow">
      <div className="flex items-center gap-6 px-6 py-3 text-black border-b border-b-gray-10 font-IBM">
        <Move className="opacity-0" />
        <span className="text-xs font-bold grow">Projectlkj</span>
        <span className=" w-[300px] text-xs font-bold">{`${name} Budget Allocation`}</span>
        <span className="text-xs font-bold w-36">OP Received</span>
      </div>
      {items.map((ranking) => (
        <RankingRow data={ranking} key={ranking.project.id} />
      ))}
    </div>
    <div
      className="p-4 rounded-xl bg-gray-60 shadow-card backdrop-blur-lg "
      hidden>
      <h4 className="font-medium text-black font-IBM">
        OP allocation for [Project name]
      </h4>
    </div>
  </div>
)

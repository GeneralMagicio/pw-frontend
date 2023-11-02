import { Move } from '@/components/Icon/Move'
import { RankingItem } from '@/types/Ranking'

interface RankingProps {
  data: RankingItem
}
export const RankingRow: React.FC<RankingProps> = ({ data }) => {
  return (
    <div className="flex cursor-pointer items-center gap-6 rounded-xl bg-gray-40 px-6 py-3 font-Inter text-black">
      <Move />
      <span className="grow">{data.project.name}</span>
      <span className="flex w-[27%] items-center justify-center">
        <span className="mr-1 text-[8px] text-red">%</span>
        <span className="">
          {(data.share * 100).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </span>
      </span>
      <span className="flex w-36 items-center">
        <span className="">
          {(data.share * 3e6).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </span>
        <span className="mb-1 ml-1 align-super text-[8px] text-red">OP</span>
      </span>
    </div>
  )
}

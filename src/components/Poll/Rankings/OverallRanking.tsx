import { OverallRankingType, Ranking } from '@/types/Ranking/index'
import { OverallRankingHeader, OverallRankingRow } from './OverallRankingRow'

interface RankingsProps {
  data: OverallRankingType[]
}

export const hasSubcollections = (
  input: OverallRankingType[] | Ranking[]
): input is OverallRankingType[] => {
  if ('votingPower' in input[0]) return true
  return false
}

const Rows: React.FC<{
  data: OverallRankingType
  level: number
  children?: React.ReactNode
}> = ({ data, level }): any => {
  if (hasSubcollections(data.ranking)) {
    return (
      <OverallRankingHeader
        data={{
          id: data.collectionTitle,
          name: data.collectionTitle,
          share: data.votingPower,
        }}
        level={level}>
        {data.ranking.map((item) => (
          <Rows data={item} key={item.collectionTitle} level={level + 1} />
        ))}
      </OverallRankingHeader>
    )
  }

  return (
    <>
      <OverallRankingHeader
        data={{
          id: data.collectionTitle,
          name: data.collectionTitle,
          share: data.votingPower,
        }}
        level={level}>
        {data.ranking.map(({ name, id, share }) => (
          <OverallRankingRow
            data={{ name, share, id }}
            key={id}
            level={level + 1}
          />
        ))}
      </OverallRankingHeader>
    </>
  )
}

export const OverallRanking: React.FC<RankingsProps> = ({ data }) => (
  <div className="container relative mx-auto mt-8 mb-32 flex min-w-[1200px] grow flex-col items-end gap-1 px-16">
    <div className="flex w-full items-center gap-6 rounded-md border-b border-b-gray-10 bg-white/[.2] px-6  py-4 font-Inter text-black">
      <span className="ml-10 grow text-sm">Project</span>
      <span className=" w-40 text-sm">{`Budget Allocation`}</span>
      <span className="w-[215px]  text-sm">OP Received</span>
    </div>
    {data.map((ranking) => (
      <Rows data={ranking} key={ranking.collectionTitle} level={0} />
    ))}
  </div>
)

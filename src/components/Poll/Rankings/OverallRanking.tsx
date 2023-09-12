import { Move } from '@/components/Icon/Move'
import { OverallRankingType, Ranking } from '@/types/Ranking/index'
import { OverallRankingHeader, OverallRankingRow } from './OverallRankingRow'
import { useCollapse } from 'react-collapsed'

interface RankingsProps {
  data: OverallRankingType[]
}

const hasSubcollections = (
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
  <div className="container relative mx-auto mt-8 flex min-w-[1200px] gap-10 px-16">
    <div className="mb-32 flex grow flex-col items-end gap-2">
      <div className="flex w-full items-center gap-6 border-b border-b-gray-10  px-6 py-3 font-IBM text-black">
        <span className="ml-32 grow text-xs font-bold">Project</span>
        <span className=" w-[250px] text-xs font-bold">{`Budget Allocation`}</span>
        <span className="w-36  text-xs font-bold">OP Received</span>
      </div>
      {data.map((ranking) => (
        <Rows data={ranking} key={ranking.collectionTitle} level={0} />
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

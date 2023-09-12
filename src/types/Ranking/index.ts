import { PairType } from '../Pairs/Pair'

export interface RankingItem {
  share: number
  project: {
    id: number
    name: string
    url: string
    description: string
    collection_id: number
    created_at: string
  }
}

export type RankingsType = RankingItem[]

export type RankingResponse = {
  collectionTitle: string
  ranking: RankingsType
  nextCollection: PairType
}

export type Ranking = {
  name: string
  id: number
  share: number
}

export type OverallRankingType = {
  collectionTitle: string
  votingPower: number
  ranking: OverallRankingType[] | Ranking[]
}

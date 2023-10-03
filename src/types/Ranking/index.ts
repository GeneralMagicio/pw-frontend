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
  votingPower: number
}

export type Rank = {
  type: "project"
  name: string
  id: number
  share: number
}

export type OverallRankingType = {
  type: "composite project" | "collection"
  id: number
  collectionTitle: string
  share: number
  ranking: (OverallRankingType | Rank)[]
}

export interface EditingRank extends Rank {
  locked: boolean
  error: boolean
}
export interface EditingOverallRankingType extends OverallRankingType {
  ranking: (EditingOverallRankingType | EditingRank)[]
  locked: boolean
  error: boolean
  expanded?: boolean
}
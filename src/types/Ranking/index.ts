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

export type ProjectType = "collection" | "project" | "composite project"

export type RankingResponse = {name: string, ranking: RankingItem[]}
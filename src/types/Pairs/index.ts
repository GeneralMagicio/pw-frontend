import { PairType } from './Pair'

export interface PairsType {
  pairs: Array<Array<PairType>>
  totalPairs: number
  votedPairs: number
  type: 'project' | 'collection' | 'expertise'
  threshold: number
  collectionTitle: string
}

export enum VOTES {
  NONE,
  LEFT,
  RIGHT,
  ABSTAIN,
}

export enum PollType {
  NORMAL = 'normal',
  EXPERTISE = 'expertise',
  IMPACT = 'root',
}

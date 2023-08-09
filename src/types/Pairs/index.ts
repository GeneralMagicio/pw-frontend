import { PairType } from './Pair'

export interface PairsType {
  pairs: Array<Array<PairType>>
  totalPairs: number
  votedPairs: number
  type: 'project' | 'collection'
}

export enum VOTES {
  NONE,
  LEFT,
  RIGHT,
  ABSTAIN,
}

import { CollectionProgressStatus } from '@/components/Galaxy/types'
import cloneDeep from 'lodash.clonedeep'

export interface CollectionRanking {
  type: 'collection' | 'composite project'
  hasRanking: true
  isTopLevel: boolean
  // isFinished: boolean
  id: number
  RPGF3Id?: string
  name: string
  share: number
  ranking: (CollectionRanking | ProjectRanking)[]
  progress: CollectionProgressStatus
}

export interface ProjectRanking {
  type: 'project' | 'collection' | 'composite project'
  hasRanking: false
  id: number
  RPGF3Id: string
  share: number
  name: string
}

export interface EditingCollectionRanking extends CollectionRanking {
  locked: boolean
  error: boolean
  expanded: boolean
  ranking: (EditingCollectionRanking | EditingProjectRanking)[]
}

export interface EditingProjectRanking extends ProjectRanking {
  locked: boolean
  error: boolean
}

const deltaCalculator = (
  currShare: number,
  totalShare: number,
  totalDelta: number
) => {
  return (totalDelta * currShare) / totalShare
}

const ripplePercentage = (
  input: EditingCollectionRanking['ranking'],
  changedId: number,
  delta: number
) => {
  const data = cloneDeep(input)
  const totalShare = data.reduce(
    (acc, curr) =>
      curr.id !== changedId && !curr.locked ? (acc += curr.share) : (acc += 0),
    0
  )

  for (let i = 0; i < data.length; i++) {
    let row = data[i]
    const shareOfDelta = deltaCalculator(row.share, totalShare, delta)
    if (!row.locked && row.id === changedId) {
      row.share += delta
      if (row.hasRanking)
        row.ranking = ripplePercentage(row.ranking, changedId, -1 * delta)
    } else if (!row.hasRanking && !row.locked && row.id !== changedId) {
      row.share -= shareOfDelta
    } else if (row.hasRanking && !row.locked && row.id !== changedId) {
      row.share -= shareOfDelta
      row.ranking = ripplePercentage(row.ranking, changedId, shareOfDelta)
    }
  }

  return data
}

export const editPercentage = (
  data: EditingCollectionRanking,
  id: number,
  newValue: number
) => {
  const overallRanking = cloneDeep(data)

  for (let i = 0; i < overallRanking.ranking.length; i++) {
    let row = overallRanking.ranking[i]
    if (row.type === 'project' && row.id === id && !row.locked) {
      const delta = newValue - row.share
      overallRanking.ranking = ripplePercentage(
        overallRanking.ranking,
        id,
        delta
      )
      return overallRanking
    } else if (row.id === id && row.type !== 'project' && !row.locked) {
      const delta = newValue - row.share
      // console.log("Here we are")
      // console.log(overallRanking.ranking[i])
      overallRanking.ranking = ripplePercentage(
        overallRanking.ranking,
        id,
        delta
      )
      // if (row.hasRanking) row.ranking = ripplePercentage(row.ranking, id, -1 * delta)
      return overallRanking
    } else if (row.type !== 'project' && row.hasRanking) {
      overallRanking.ranking[i] = editPercentage(row, id, newValue)
    }
  }
  return overallRanking
}

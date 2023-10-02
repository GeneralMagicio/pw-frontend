import { flattenRankingData } from '@/pages/ranking'
import {
  OverallRankingType,
  EditingOverallRankingType,
  EditingRank,
  Rank,
} from '@/types/Ranking'
import { toFixedNumber } from '@/utils/helpers'
import cloneDeep from 'lodash.clonedeep'

export function removeAddedProperties(
  input: EditingOverallRankingType[]
): OverallRankingType[] {
  const ranking: OverallRankingType[] = cloneDeep(input)
  for (let i = 0; i < ranking.length; i++) {
    // @ts-ignore
    delete ranking[i].locked
    // @ts-ignore
    delete ranking[i].error
    if (ranking[i].ranking[0].type === 'project') {
      for (let j = 0; j < ranking[i].ranking.length; j++) {
        // @ts-ignore
        delete ranking[i].ranking[j].locked
        // @ts-ignore
        delete ranking[i].ranking[j].error
      }
    } else
      ranking[i].ranking = removeAddedProperties(
        ranking[i].ranking as EditingOverallRankingType[]
      )
  }

  return ranking
}

export function addLockedProperty<T extends OverallRankingType[]>(
  ranking: T
): EditingOverallRankingType[] {
  for (let i = 0; i < ranking.length; i++) {
    // @ts-ignore
    ranking[i].locked = ranking[i].locked ?? false
    // @ts-ignore
    ranking[i].error = ranking[i].error ?? false

    for (let j = 0; j < ranking[i].ranking.length; j++) {
      if (ranking[i].ranking[j].type === 'project') {
        // @ts-ignore
        ranking[i].ranking[j].locked = ranking[i].ranking[j].locked ?? false
        // @ts-ignore
        ranking[i].ranking[j].error = ranking[i].ranking[j].error ?? false
      }
      // @ts-ignore
      else
        ranking[i].ranking[j] = addLockedProperty([
          ranking[i].ranking[j],
        ] as OverallRankingType[])[0]
    }
  }

  return cloneDeep(ranking) as unknown as EditingOverallRankingType[]
}

export const resetErrorProperty = (
  ranking: OverallRankingType[]
): EditingOverallRankingType[] => {
  for (let i = 0; i < ranking.length; i++) {
    // @ts-ignore
    ranking[i].error = false

    for (let j = 0; j < ranking[i].ranking.length; j++) {
      if (ranking[i].ranking[j].type === 'project') {
        // @ts-ignore
        ranking[i].ranking[j].error = false
      }
      // @ts-ignore
      else
        ranking[i].ranking[j] = resetErrorProperty([
          ranking[i].ranking[j],
        ] as OverallRankingType[])[0]
    }
  }

  return cloneDeep(ranking) as unknown as EditingOverallRankingType[]
}

export const setErrorProperty = (
  ranking: EditingOverallRankingType[],
  type: 'project' | 'collection',
  id: number,
  val: boolean
): EditingOverallRankingType[] => {
  for (let i = 0; i < ranking.length; i++) {
    // @ts-ignore
    if (type === 'collection' && ranking[i].id === id) ranking[i].error = val

    for (let j = 0; j < ranking[i].ranking.length; j++) {
      if (ranking[i].ranking[j].type === 'project') {
        // @ts-ignore
        if (type === 'project' && ranking[i].ranking[j].id === id)
          ranking[i].ranking[j].error = val
      } else {
        ranking[i].ranking[j] = setErrorProperty(
          [ranking[i].ranking[j]] as EditingOverallRankingType[],
          type,
          id,
          val
        )[0]
      }
    }
  }
  return cloneDeep(ranking) as EditingOverallRankingType[]
}

export const changeProjectLockStatus = (
  input: EditingOverallRankingType[],
  id: number
): EditingOverallRankingType[] => {
  const data = cloneDeep(input)
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item.ranking[0].type === 'project') {
      const index = item.ranking.findIndex((el) => el.id === id)
      if (index !== -1) {
        item.ranking[index].locked = !item.ranking[index].locked
        return data
      }
    } else {
      item.ranking = changeProjectLockStatus(
        item.ranking as EditingOverallRankingType[],
        id
      )
    }
  }

  return data
}

export const changeCollectionLockStatus = (
  input: EditingOverallRankingType[],
  id: number
): EditingOverallRankingType[] => {
  const data = cloneDeep(input)
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item.id === id) {
      item.locked = !item.locked
      return data
    } else if (item.ranking[0].type !== 'project') {
      item.ranking = changeCollectionLockStatus(
        item.ranking as EditingOverallRankingType[],
        id
      )
    }
  }

  return data
}

export const validateRanking = (ranking: EditingOverallRankingType[]) => {
  for (let i = 0; i < ranking.length; i++) {
    if (ranking[i].share < 0) return false
    else {
      for (let j = 0; j < ranking[i].ranking.length; j++) {
        if (ranking[i].ranking[j].type !== 'project') {
          const val = validateRanking([
            ranking[i].ranking[j] as EditingOverallRankingType,
          ])
          if (val === false) return false
        }
      }
    }
    // else if (!isEditingRank(ranking[i].ranking[0])) {
    //   const val = validateRanking(ranking[i].ranking as EditingOverallRankingType[])
    //   if (val === false) return false
    // }
  }

  const flattenedRanking = flattenRankingData({
    ranking,
    id: -1,
    collectionTitle: 'Root',
    share: 1,
    type: 'collection',
  })

  const negativeValue = flattenedRanking.some(
    (el) => toFixedNumber(el.share, 4) < 0
  )

  if (negativeValue) {
    console.log('neg value error')
    return false
  }

  const percentageSum = flattenedRanking.reduce(
    (acc, curr) => (acc = acc + curr.share),
    0
  )

  if (percentageSum > 1.01) {
    console.log('over 100 error', percentageSum)
    return false
  }

  return true
}

// export const isEditingRank = (
//   val: EditingRank | EditingOverallRankingType
// ): val is EditingRank => {
//   if ('ranking' in val) return false
//   return true
// }

// export const isRank = (val: Rank | OverallRankingType): val is Rank => {
//   if ('ranking' in val) return false
//   return true
// }

export const deltaCalculator = (
  currShare: number,
  totalShare: number,
  totalDelta: number
) => {
  return (totalDelta * currShare) / totalShare
}

// export const checkRowType = ()

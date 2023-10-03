import { flattenRankingData } from '@/pages/ranking'
import {
  OverallRankingType,
  EditingOverallRankingType,
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

    for (let j = 0; j < ranking[i].ranking.length; j++) {
      if (ranking[i].ranking[j].type === 'project') {
        // @ts-ignore
        delete ranking[i].ranking[j].locked
        // @ts-ignore
        delete ranking[i].ranking[j].error
      }
      else
        ranking[i].ranking[j] = removeAddedProperties([
          ranking[i].ranking[j],
        ] as EditingOverallRankingType[])[0]
    }
  }

  return cloneDeep(ranking)
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
    if (type === 'collection' && ranking[i].id === id) ranking[i].error = val

    for (let j = 0; j < ranking[i].ranking.length; j++) {
      if (ranking[i].ranking[j].type === 'project') {
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
    for (let j = 0; j < item.ranking.length; j++) {
      if (item.ranking[j].type === 'project') {
        // const index = item.ranking.findIndex((el) => el.id === id)
        if (item.ranking[j].id === id) {
          item.ranking[j].locked = !item.ranking[j].locked
          return data
        }
      } else {
        item.ranking[j] = changeProjectLockStatus(
          [item.ranking[j]] as EditingOverallRankingType[],
          id
        )[0]
      }
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
    if (data[i].id === id && data[i].type === "collection") {
      data[i].locked = !data[i].locked
    }
    else if (data[i].type === "collection") 
      data[i].ranking = changeCollectionLockStatus(data[i].ranking as EditingOverallRankingType[], id)
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

  if (percentageSum > 1.02) {
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

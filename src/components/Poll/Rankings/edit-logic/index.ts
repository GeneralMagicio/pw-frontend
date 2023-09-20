import { flattenRankingData } from '@/pages/ranking'
import {
  EditingOverallRankingType,
  EditingRank,
  OverallRankingType,
  Rank,
} from '@/types/Ranking'
import { toFixedNumber } from '@/utils/helpers'
import cloneDeep from 'lodash.clonedeep'

export const changePercentageInList = (
  list: EditingRank[],
  itemId: number,
  newValue: number
) => {
  const targetItem = list.find((item) => (item.id === itemId))

  if (!targetItem) throw new Error('')

  const diff = newValue - targetItem.share

  targetItem.share = newValue

  const numOfOtherUnlockedItems = list.filter((item) => !item.locked).length - 1

  const delta = diff / numOfOtherUnlockedItems

  return list.map((item) =>
    !item.locked && item.id !== itemId
      ? { ...item, share: item.share - delta }
      : { ...item }
  )
}

export const isEditingRank = (
  val: EditingRank | EditingOverallRankingType
): val is EditingRank => {
  if ('ranking' in val) return false
  return true
}

export const isRank = (
  val: Rank | OverallRankingType
): val is Rank => {
  if ('ranking' in val) return false
  return true
}

export const replaceList = (
  collection: EditingOverallRankingType,
  itemId: number,
  newValue: number
) => {
  const index = collection.ranking.findIndex(
    (item) => isEditingRank(item) && item.id === itemId
  )

  if (index === -1) return { ...collection }

  collection.ranking = changePercentageInList(
    collection.ranking as EditingRank[],
    itemId,
    newValue
  )

  return cloneDeep(collection)
}

export const changePercentage = (
  value: EditingOverallRankingType[],
  itemId: number,
  newValue: number
) : EditingOverallRankingType[] => {

  const ranking = cloneDeep(value)
  for (let i = 0; i < ranking.length; i++) {
    if (isEditingRank(ranking[i].ranking[0])) {
      ranking[i] = replaceList(ranking[i], itemId, newValue)
    } else {
      ranking[i].ranking = changePercentage(ranking[i].ranking as EditingOverallRankingType[], itemId, newValue)
    }
  }

  return cloneDeep(ranking)
}

export const addLockedProperty = (ranking: OverallRankingType[]) : EditingOverallRankingType[] => {
  for (let i = 0; i < ranking.length; i++) {
    // @ts-ignore
    ranking[i].locked = false
    if (isRank(ranking[i].ranking[0])) {
      for (let j = 0; j < ranking[i].ranking.length; j++) {
        // @ts-ignore
        ranking[i].ranking[j].locked = false
      }
    }
    else addLockedProperty(ranking[i].ranking as OverallRankingType[])
  }

  return cloneDeep(ranking) as EditingOverallRankingType[]
}

export const validateRanking = (ranking: EditingOverallRankingType[]) => {
  for (let i = 0; i < ranking.length; i++) {
    if (toFixedNumber(ranking[i].votingPower * 100, 1) < 0) return false
    else if (!isEditingRank(ranking[i].ranking[0])) {
      const val = validateRanking(ranking[i].ranking as EditingOverallRankingType[])
      if (val === false) return false
    }
  }

  const flattenedRanking = flattenRankingData(ranking);

  const negativeValue = flattenedRanking.some((el) => toFixedNumber(el.share, 1) < 0)

  if (negativeValue) {
    return false
  }
  
  const percentageSum = flattenedRanking.reduce((acc, curr) => acc += curr.share, 0)
  
  if (percentageSum > 100) {
    return false
  } 

  return true;
}
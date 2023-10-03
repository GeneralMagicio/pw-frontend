import { EditingOverallRankingType, EditingRank } from '@/types/Ranking'
import cloneDeep from 'lodash.clonedeep'
import { deltaCalculator } from './utils'

const changePercentageInList = (
  inputList: EditingOverallRankingType[],
  itemId: number,
  newValue: number
): EditingOverallRankingType[] => {
  const list = cloneDeep(inputList)

  const targetIndex = list.findIndex(
    (item) => item.type === "collection" && item.id === itemId
  )
  const targetItem = list[targetIndex]

  if (!targetItem) return list

  const diff = newValue - targetItem.share

  const totalShare = list.reduce((acc, curr) => {
    if (curr.id !== targetItem.id && !curr.locked)
      return (acc += curr.share)
    else return (acc += 0)
  }, 0)

  for (let i = 0; i < list.length; i++) {
    if (i === targetIndex) list[i] = multiplyCoeff(list[i], diff)
    else if (!list[i].locked)
      list[i] = multiplyCoeff(
        list[i],
        deltaCalculator(list[i].share, totalShare, -1 * diff)
      )
  }

  return list
}

const multiplyCoeff = (
  input: EditingOverallRankingType,
  totalDelta: number
) => {
  const collection = cloneDeep(input)
  collection.share = collection.share + totalDelta

  // @ts-ignore
  if (input.type === "project") return collection

  const totalShare = collection.ranking.reduce((acc, curr) => {
    if (!curr.locked)
      return acc += curr.share
    return (acc += 0)
  }, 0)

  for (let i = 0; i < collection.ranking.length; i++) {
    if (collection.ranking[i].type === "project") {
      const item = collection.ranking[i] as EditingRank
      if (!item.locked)
        item.share =
          item.share + deltaCalculator(item.share, totalShare, totalDelta)
    } else {
      const item = collection.ranking[i] as EditingOverallRankingType
      if (!item.locked)
        collection.ranking[i] = multiplyCoeff(
          item,
          deltaCalculator(item.share, totalShare, totalDelta)
        )
    }
  }

  return collection
}

export const changeCollectionPercentage = (
  value: EditingOverallRankingType[],
  itemId: number,
  newValue: number
): EditingOverallRankingType[] => {
  let ranking = cloneDeep(value)
  for (let i = 0; i < ranking.length; i++) {
    if (ranking[i].id === itemId)
      ranking = changePercentageInList(ranking, itemId, newValue)
    else {
      for (let j = 0; j < ranking[i].ranking.length; j++) {
        if (ranking[i].ranking[j].type !== "project") {
          ranking[i].ranking[j] = changeCollectionPercentage(
            [ranking[i].ranking[j] as EditingOverallRankingType],
            itemId,
            newValue
          )[0]
        }
      }
    }
  }

  return cloneDeep(ranking)
}

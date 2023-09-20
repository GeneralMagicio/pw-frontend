import { EditingOverallRankingType, EditingRank } from '@/types/Ranking'
import cloneDeep from 'lodash.clonedeep'
import { isEditingRank } from '.'

const changePercentageInList = (
  inputList: EditingOverallRankingType[],
  itemId: number,
  newValue: number
): EditingOverallRankingType[] => {
  const list = cloneDeep(inputList)

  const targetIndex = list.findIndex((item) => (!isEditingRank(item) && item.id === itemId))
  const targetItem = list[targetIndex]

  if (!targetItem) return list

  const diff = newValue - targetItem.votingPower

  const unlockedItems = list.filter((el) => !el.locked).length - 1

  for (let i = 0; i < list.length; i++) {
    if (i === targetIndex) list[i] = multiplyCoeff(list[i], diff)
    else if (!list[i].locked) list[i] = multiplyCoeff(list[i], -1 * (diff / unlockedItems))
  }

  return list
}

const multiplyCoeff = (input: EditingOverallRankingType, delta: number) => {
  const collection = cloneDeep(input)
  collection.votingPower = collection.votingPower + delta

  console.log("input:", input)
  console.log("delta:", delta)

  if (isEditingRank(input)) return collection;

  if (isEditingRank(collection.ranking[0])) {
    // @ts-ignore
    const unlockedItems = collection.ranking.filter((el) => !el.locked).length
    for (let i = 0; i < collection.ranking.length; i++) {
      const item = collection.ranking[i] as EditingRank
      if (!item.locked) item.share = item.share + delta / unlockedItems
    }
  } else {
    for (let i = 0; i < collection.ranking.length; i++) {
      const item = collection.ranking[i] as EditingOverallRankingType
      // @ts-ignore
      const unlockedCollections = collection.ranking.filter(
        (el: EditingOverallRankingType | EditingRank) => !el.locked
      ).length
      if (!item.locked)
        collection.ranking[i] = multiplyCoeff(item, delta / unlockedCollections)
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
  // ranking = changeCollectionPercentage(value, itemId, newValue)
  for (let i = 0; i < ranking.length; i++) {
    if (ranking[i].id === itemId)
      ranking = changePercentageInList(
        ranking,
        itemId,
        newValue
      )
    else if (!isEditingRank(ranking[i].ranking[0])) {
      ranking[i].ranking = changeCollectionPercentage(
        ranking[i].ranking as EditingOverallRankingType[],
        itemId,
        newValue
      )
    }
  }

  return cloneDeep(ranking)
}

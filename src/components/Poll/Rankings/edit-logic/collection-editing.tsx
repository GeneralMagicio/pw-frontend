import { EditingOverallRankingType, EditingRank } from '@/types/Ranking'
import cloneDeep from 'lodash.clonedeep'
import { deltaCalculator, isEditingRank } from './utils'

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

  // const unlockedItems = list.filter((el) => !el.locked).length - 1
  const totalShare = list.reduce((acc, curr) => {
    if (curr.id !== targetItem.id && !curr.locked) return acc += curr.votingPower
    else return acc += 0
  }, 0)

  for (let i = 0; i < list.length; i++) {
    if (i === targetIndex) list[i] = multiplyCoeff(list[i], diff)
    else if (!list[i].locked) list[i] = multiplyCoeff(list[i], deltaCalculator(list[i].votingPower, totalShare, -1 * diff))
  }

  return list
}



const multiplyCoeff = (input: EditingOverallRankingType, totalDelta: number) => {
  const collection = cloneDeep(input)
  collection.votingPower = collection.votingPower + totalDelta

  if (isEditingRank(input)) return collection;

  if (isEditingRank(collection.ranking[0])) {
    // @ts-ignore
    // const unlockedItems = collection.ranking.filter((el) => !el.locked).length
    const totalShare = (collection.ranking as EditingRank[]).reduce((acc, curr) => {
      if (!curr.locked) return acc += curr.share
      return acc += 0
    }, 0)

    for (let i = 0; i < collection.ranking.length; i++) {
      const item = collection.ranking[i] as EditingRank
      if (!item.locked) item.share = item.share + deltaCalculator(item.share, totalShare, totalDelta)
    }
  } else {
    const totalShare = (collection.ranking as EditingOverallRankingType[]).reduce((acc, curr) =>{ 
      if (!curr.locked) return acc += curr.votingPower
      return acc += 0
    }, 0)

    for (let i = 0; i < collection.ranking.length; i++) {
      const item = collection.ranking[i] as EditingOverallRankingType
      // @ts-ignore
      // const unlockedCollections = collection.ranking.filter(
      //   (el: EditingOverallRankingType | EditingRank) => !el.locked
      // ).length
      if (!item.locked)
        collection.ranking[i] = multiplyCoeff(item, deltaCalculator(item.votingPower, totalShare, totalDelta))
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
      ranking = changePercentageInList(
        ranking,
        itemId,
        newValue
      )
    else {
      for (let j = 0; j < ranking[i].ranking.length; j++) {
        if (!isEditingRank(ranking[i].ranking[j])) {
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

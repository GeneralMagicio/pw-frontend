import { EditingOverallRankingType, EditingRank } from '@/types/Ranking'
import cloneDeep from 'lodash.clonedeep'
import { deltaCalculator } from './utils'

export const changePercentageInList = (
  list: (EditingRank | EditingOverallRankingType)[],
  itemId: number,
  newValue: number
) => {
  const targetItem = list.find((item) => item.id === itemId)

  if (!targetItem) throw new Error('')

  const diff = newValue - targetItem.share

  targetItem.share = newValue

  const totalShare = list.reduce((acc, curr) => {
    if (curr.id !== itemId && !curr.locked) return (acc += curr.share)
    else return (acc += 0)
  }, 0)

  if (targetItem.type === 'composite project') {
    targetItem.ranking = changeSubProjectPercentages(targetItem.ranking as EditingRank[], diff)
  }

  return list.map((item) => {
    if (!item.locked && item.id !== itemId && item.type === 'composite project')
      return {
        ...item,
        share: item.share - deltaCalculator(item.share, totalShare, diff),
        ranking: changeSubProjectPercentages(
          item.ranking as EditingRank[],
          deltaCalculator(item.share, totalShare, diff) * -1
        ),
      }
    else if (!item.locked && item.id !== itemId)
      return {
        ...item,
        share: item.share - deltaCalculator(item.share, totalShare, diff),
      }
    else return { ...item }
  })
}

const changeSubProjectPercentages = (input: EditingRank[], diff: number) => {
  let data = cloneDeep(input)
  const total = data.reduce(
    (acc, curr) => (acc += !curr.locked ? curr.share : 0),
    0
  )
  data = data.map((item) => ({
    ...item,
    share: item.share + deltaCalculator(item.share, total, diff),
  }))

  return cloneDeep(data)
}

export const replaceList = (
  collection: EditingOverallRankingType,
  itemId: number,
  newValue: number
) => {
  const index = collection.ranking.findIndex(
    (item) => item.type !== 'collection' && item.id === itemId
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
): EditingOverallRankingType[] => {
  const ranking = cloneDeep(value)
  for (let i = 0; i < ranking.length; i++) {
    // all are projects
    if (
      ranking[i].ranking &&
      ranking[i].ranking.every((el) => el.type === 'project')
    ) {
      ranking[i] = replaceList(ranking[i], itemId, newValue)
    }
    // all are collections
    else if (
      ranking[i].ranking &&
      ranking[i].ranking.every((el) => el.type === 'collection')
    ) {
      ranking[i].ranking = changePercentage(
        ranking[i].ranking as EditingOverallRankingType[],
        itemId,
        newValue
      )
    }
    // some projects and some composite projects
    else if (ranking[i]) {
      ranking[i] = replaceList(ranking[i], itemId, newValue)
      // for (let j = 0; j < ranking[i].ranking.length; j++) {
      //   if (ranking[i].ranking[j].type === "composite project") console.log("composite")
      //   else ranking[i].ranking = changePercentage(ranking[i].ranking as EditingOverallRankingType[], itemId, newValue)
      // }
    }
  }

  return cloneDeep(ranking)
}
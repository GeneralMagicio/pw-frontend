import { flattenRankingData } from "@/pages/ranking"
import { OverallRankingType, EditingOverallRankingType, EditingRank, Rank } from "@/types/Ranking"
import { toFixedNumber } from "@/utils/helpers"
import cloneDeep from "lodash.clonedeep"

export function removeAddedProperties(input: EditingOverallRankingType[]) : OverallRankingType[] {
  const ranking : OverallRankingType[] = cloneDeep(input)
  for (let i = 0; i < ranking.length; i++) {
    // @ts-ignore
    delete ranking[i].locked
    // @ts-ignore
    delete ranking[i].error
    if (isRank(ranking[i].ranking[0])) {
      for (let j = 0; j < ranking[i].ranking.length; j++) {
        // @ts-ignore
        delete ranking[i].ranking[j].locked
        // @ts-ignore
        delete ranking[i].ranking[j].error
      }
    }
    else ranking[i].ranking = removeAddedProperties(ranking[i].ranking as EditingOverallRankingType[])
  }

  return ranking
}

export function addLockedProperty<T extends OverallRankingType[]> (ranking: T) : EditingOverallRankingType[] {
  for (let i = 0; i < ranking.length; i++) {
    // @ts-ignore
    ranking[i].locked = ranking[i].locked ?? false
    // @ts-ignore
    ranking[i].error = ranking[i].error ?? false
    if (isRank(ranking[i].ranking[0])) {
      for (let j = 0; j < ranking[i].ranking.length; j++) {
        // @ts-ignore
        ranking[i].ranking[j].locked = ranking[i].ranking[j].locked ?? false
        // @ts-ignore
        ranking[i].ranking[j].error = ranking[i].ranking[j].error ?? false
      }
    }
    else addLockedProperty(ranking[i].ranking as OverallRankingType[])
  }

  return cloneDeep(ranking) as unknown as EditingOverallRankingType[]
}

export const resetErrorProperty = (ranking: OverallRankingType[]) : EditingOverallRankingType[] => {
  for (let i = 0; i < ranking.length; i++) {
    // @ts-ignore
    ranking[i].error = false
    if (isRank(ranking[i].ranking[0])) {
      for (let j = 0; j < ranking[i].ranking.length; j++) {
        // @ts-ignore
        ranking[i].ranking[j].error = false
      }
    }
    else resetErrorProperty(ranking[i].ranking as OverallRankingType[])
  }

  return cloneDeep(ranking) as EditingOverallRankingType[]
}

export const setErrorProperty = (ranking: EditingOverallRankingType[], type: "project" | "collection", id: number, val: boolean) : EditingOverallRankingType[] => {
  for (let i = 0; i < ranking.length; i++) {
    // @ts-ignore
    if (type === "collection" && ranking[i].id === id) ranking[i].error = val
    if (isRank(ranking[i].ranking[0])) {
      for (let j = 0; j < ranking[i].ranking.length; j++) {
        // @ts-ignore
        if (type === "project" && ranking[i].ranking[j].id === id) ranking[i].ranking[j].error = val
      }
    }
    else setErrorProperty(ranking[i].ranking as EditingOverallRankingType[], type, id, val)
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
    if (isEditingRank(item.ranking[0])) {
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
    } else if (!isEditingRank(item.ranking[0])) {
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
    if (ranking[i].votingPower < 0) return false
    else if (!isEditingRank(ranking[i].ranking[0])) {
      const val = validateRanking(ranking[i].ranking as EditingOverallRankingType[])
      if (val === false) return false
    }
  }

  const flattenedRanking = flattenRankingData(ranking);

  const negativeValue = flattenedRanking.some((el) => toFixedNumber(el.share, 8) < 0)

  if (negativeValue) {
    console.log("neg value error")
    return false
  }
  
  const percentageSum = flattenedRanking.reduce((acc, curr) => acc = acc + curr.share, 0)
  
  if (percentageSum > 1.01) {
    console.log("over 100 error", percentageSum)
    return false
  } 

  return true;
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

export const deltaCalculator = (currShare: number, totalShare: number, totalDelta: number) => {
  return totalDelta * currShare / totalShare
}
import cloneDeep from 'lodash.clonedeep'
import { CollectionRanking, EditingCollectionRanking, ProjectRanking } from './edit'

export function removeAdditionalProperties(
  input: EditingCollectionRanking
): CollectionRanking {
  const data = cloneDeep(input)

  // @ts-ignore
  delete data.locked
  // @ts-ignore
  delete data.error
  for (let i = 0; i < data.ranking.length; i++) {
    let row = data.ranking[i]

    if (row.type === "project") {
      // @ts-ignore
      delete row.locked
      // @ts-ignore
      delete row.error
    } else {
      // @ts-ignore
      data.ranking[i] = removeAdditionalProperties(row)
    }
  }

  return data as CollectionRanking
}

export function addAdditionalProperties<T extends CollectionRanking>(
  input: T
): EditingCollectionRanking {
  const data = cloneDeep(input)

  // @ts-ignore
  data.locked = data.locked ?? false
  // @ts-ignore
  data.error = data.error ?? false
  for (let i = 0; i < data.ranking.length; i++) {
    let row = data.ranking[i]

    if (row.type === "project") {
      // @ts-ignore
      row.locked = row.locked ?? false
      // @ts-ignore
      row.error = row.error ?? false
    } else {
      data.ranking[i] = addAdditionalProperties(row)
    }
  }

  return data as unknown as EditingCollectionRanking
}

export function resetErrorProperty(
  input: EditingCollectionRanking
): EditingCollectionRanking {
  const data = cloneDeep(input)
  data.error = false
  for (let i = 0; i < data.ranking.length; i++) {
    let row = data.ranking[i]

    if (row.type === "project") {
      row.error = false
    } else {
      data.ranking[i] = resetErrorProperty(row)
    }
  }

  return data
}

export function setErrorProperty(
  input: EditingCollectionRanking,
  id: number
  ): EditingCollectionRanking {
  const data = cloneDeep(input)
  if (data.id === id) {
    data.error = !data.error
  }
  
  for (let i = 0; i < data.ranking.length; i++) {
    let row = data.ranking[i]

    if (row.id === id) {
      // row.locked = false
      row.error = !row.error
    } else if (row.type !== "project") {
      data.ranking[i] = setErrorProperty(row, id)
    }
  }
  
  return data
}

export function setLockProperty(
  input: EditingCollectionRanking,
  id: number
  ): EditingCollectionRanking {
  console.log("calling?")
  const data = cloneDeep(input)

  if (data.id === id) {
    data.locked = !data.locked
  }

  for (let i = 0; i < data.ranking.length; i++) {
    let row = data.ranking[i]

    if (row.id === id) {
      console.log
      // row.locked = false
      row.locked = !row.locked
    } else if (row.type !== "project") {
      data.ranking[i] = setLockProperty(row, id)
    }
  }

  return data
}

export const validateRanking = (data: EditingCollectionRanking) => {
  for (let i = 0; i < data.ranking.length; i++) {
    const max = data.ranking[i].share
    const row = data.ranking[i]
    let acc = 0
    if (row.share < 0 || row.share > 100) {console.log(row); return false}
    else acc += row.share

    if (row.type !== "project" && !validateRanking(row)) return false;

    if (acc !== max) {console.log(row); return false}

  }
  return true;
}
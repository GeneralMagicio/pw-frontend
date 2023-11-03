import cloneDeep from 'lodash.clonedeep'
import { CollectionRanking, EditingCollectionRanking, ProjectRanking } from './edit'
import { toFixedNumber } from '@/utils/helpers'
import { CollectionProgressStatus } from '@/components/Galaxy/types'

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

    if (!row.hasRanking) {
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

const shouldBeLocked = (row: {isTopLevel: boolean, locked?: boolean, progress: CollectionProgressStatus}) => {
  if (row.isTopLevel) return false;

  if ("locked" in row) return row.locked

  const progress = row.progress

  switch(progress) {
    case "Attested":
      return false;
    case "Finished":
      return false;
    case 'WIP':
      return true;
    case 'Pending':
      return true
    default:
      return false
  }
}

export function addAdditionalProperties(
  input: CollectionRanking | EditingCollectionRanking
): EditingCollectionRanking {
  const data = cloneDeep(input)

  // @ts-ignore
  data.locked = shouldBeLocked(data)
  // @ts-ignore
  data.error = data.error ?? false
  for (let i = 0; i < data.ranking.length; i++) {
    let row = data.ranking[i]
    // @ts-ignore
    row.locked = data.locked === true ? true : shouldBeLocked(row)
    if (!row.hasRanking) {
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

    if (!row.hasRanking) {
      row.error = false
    } else {
      data.ranking[i] = resetErrorProperty(row)
    }
  }

  return data
}

export function setErrorProperty(
  input: EditingCollectionRanking,
  id: number,
  value: boolean,
  ): EditingCollectionRanking {
  const data = cloneDeep(input)
  if (data.id === id) {
    data.error = !data.error
  }
  
  for (let i = 0; i < data.ranking.length; i++) {
    let row = data.ranking[i]

    if (row.id === id) {
      row.error = value
    } else if (row.type !== "project" && row.hasRanking) {
      data.ranking[i] = setErrorProperty(row, id, value)
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
      row.locked = !row.locked
    } else if (row.type !== "project" && row.hasRanking) {
      data.ranking[i] = setLockProperty(row, id)
    }
  }

  return data
}

export const validateRanking = (data: EditingCollectionRanking) => {
  const max = data.share;
  let acc = 0;
  for (let i = 0; i < data.ranking.length; i++) {
    const row = data.ranking[i];
    if (toFixedNumber(row.share, 5) < 0 || toFixedNumber(row.share, 5) > 1) {
      console.log("Error neg or 1", row)
      return false;
    } else acc += row.share;

    if (row.type !== 'project' && row.hasRanking && !validateRanking(row))
      return false;

    if (toFixedNumber(acc, 5) > toFixedNumber(max, 5)) {
      console.log(row, "Error parent", acc, "and max:", max)
      return false;
    }
  }
  return true;
};
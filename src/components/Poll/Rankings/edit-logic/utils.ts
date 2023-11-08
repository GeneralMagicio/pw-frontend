import cloneDeep from 'lodash.clonedeep'
import { CollectionRanking, EditingCollectionRanking, ProjectRanking } from './edit'
import { toFixedNumber } from '@/utils/helpers'
import { CollectionProgressStatus } from '@/components/Galaxy/types'

export function removeAdditionalProperties(
  input: EditingCollectionRanking
): CollectionRanking {
  const data = cloneDeep(input)

  // @ts-ignore
  delete data.state
  // @ts-ignore
  delete data.error
  for (let i = 0; i < data.ranking.length; i++) {
    let row = data.ranking[i]

    if (!row.hasRanking) {
      // @ts-ignore
      delete row.state
      // @ts-ignore
      delete row.error
    } else {
      // @ts-ignore
      data.ranking[i] = removeAdditionalProperties(row)
    }
  }

  return data as CollectionRanking
}

const determineState = (row: CollectionRanking | ProjectRanking, parent?: EditingCollectionRanking) : EditingCollectionRanking['state'] => {

  if (row.hasRanking === false) {
    if (parent && parent.state === "disabled") return "disabled"
    else return "normal"
  }

  if (row.isTopLevel) return "normal";

  const progress = row.progress

  switch(progress) {
    case "Attested":
      return "normal";
    case "Finished":
      return "normal";
    case 'WIP':
      return "disabled";
    case 'Pending':
      return "disabled"
    default:
      return "disabled"
  }
}

export function addAdditionalProperties(
  input: CollectionRanking
): EditingCollectionRanking {
  const data = cloneDeep(input)

  // @ts-ignore
  data.state = determineState(data)
  // @ts-ignore
  data.error = data.error ?? false
  for (let i = 0; i < data.ranking.length; i++) {
    let row = data.ranking[i]
    // @ts-ignore
    row.state = determineState(row, data)
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

export function setLock(
  input: EditingCollectionRanking,
  id: number
  ): EditingCollectionRanking {
  console.log("Here")
  const data = cloneDeep(input)

  if (data.id === id) {
    data.state = data.state === "locked" ? "normal" : "locked"
  }

  for (let i = 0; i < data.ranking.length; i++) {
    let row = data.ranking[i]

    if (row.id === id) {
      row.state = row.state === "locked" ? "normal" : "locked"
    } else if (row.type !== "project" && row.hasRanking) {
      data.ranking[i] = setLock(row, id)
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
import cloneDeep from 'lodash.clonedeep'

export interface CollectionRanking {
  type: 'collection' | 'composite project'
  id: number
  collectionTitle: string
  share: number
  ranking: (CollectionRanking | ProjectRanking)[]
}

export interface ProjectRanking {
  type: 'project'
  id: number
  share: number
  name: string
}

export interface EditingCollectionRanking extends CollectionRanking {
  locked: boolean
  error: boolean
  expanded: boolean
  ranking: (EditingCollectionRanking | EditingProjectRanking)[]
}

export interface EditingProjectRanking extends ProjectRanking {
  locked: boolean
  error: boolean
}

const deltaCalculator = (
  currShare: number,
  totalShare: number,
  totalDelta: number
) => {
  return (totalDelta * currShare) / totalShare
}

const ripplePercentage = (
  input: EditingCollectionRanking['ranking'],
  changedId: number,
  delta: number
) => {
  const data = cloneDeep(input)
  const totalShare = data.reduce(
    (acc, curr) =>
      curr.id !== changedId && !curr.locked ? (acc += curr.share) : (acc += 0),
    0
  )

  for (let i = 0; i < data.length; i++) {
    let row = data[i]
    const shareOfDelta = deltaCalculator(row.share, totalShare, delta)
    if (!row.locked && row.id === changedId) {
      console.log("Even reached here?")
      row.share += delta
    } else if (row.type === 'project' && !row.locked && row.id !== changedId) {
      row.share -= shareOfDelta
    } else if (row.type !== 'project' && !row.locked && row.id !== changedId) {
      row.share -= shareOfDelta
      row.ranking = ripplePercentage(row.ranking, changedId, shareOfDelta)
    }
  }

  return data
}

export const editPercentage = (
  data: EditingCollectionRanking,
  id: number,
  newValue: number
) => {
  console.log("ep called")
  const overallRanking = cloneDeep(data)

  for (let i = 0; i < overallRanking.ranking.length; i++) {
    let row = overallRanking.ranking[i]
    if (row.type === 'project' && row.id === id && !row.locked) {
      console.log('found it', row)
      const delta = newValue - row.share
      overallRanking.ranking = ripplePercentage(
        overallRanking.ranking,
        id,
        delta,
      )

      console.log("new orr:", overallRanking.ranking)
      return overallRanking
    } else if (row.id === id && row.type !== 'project' && !row.locked) {
      const delta = newValue - row.share
      console.log('Delta is:', delta)
      overallRanking.ranking = ripplePercentage(
        overallRanking.ranking,
        id,
        delta
      )
      // @ts-ignore
      overallRanking.ranking[i].ranking = ripplePercentage(row.ranking, id, -1 * delta)
      return overallRanking
    } else if (row.type !== 'project' && !row.locked) {
      console.log("Here 3")
      overallRanking.ranking[i] = editPercentage(row, id, newValue)
      // row = editPercentage(row, id, newValue)
    }
    
    console.log("Here 4")
    // } else if (row.id === id) {
    //   overallRanking
    // }
  }
  return overallRanking
}

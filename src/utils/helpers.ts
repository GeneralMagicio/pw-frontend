import { pinFileToIPFS } from '@/components/Poll/Rankings/OverallRankingRow/attest-utils'
import { CollectionRanking } from '@/components/Poll/Rankings/edit-logic/edit'

export function generateNonOverlappingOrbitCoordinates(
  totalPoints: number,
  radiusDivider: number = 4
) {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  const centerX = viewportWidth / 2
  const centerY = viewportHeight / 2

  const orbitRadius = Math.min(viewportWidth, viewportHeight) / radiusDivider

  const angleIncrement = (2 * Math.PI) / totalPoints

  const coordinates = []
  const minDistance = 150 // Minimum distance between points

  for (let i = 0; i < totalPoints; i++) {
    let angle = -i * angleIncrement
    let x, y
    let attempts = 0
    const maxAttempts = 100

    do {
      x = centerX + orbitRadius * Math.cos(angle)
      y = centerY + orbitRadius * Math.sin(angle)

      let isOverlapping = false
      for (const existingCoordinates of coordinates) {
        const distance = Math.sqrt(
          Math.pow(x - existingCoordinates.x, 2) +
            Math.pow(y - existingCoordinates.y, 2)
        )
        if (distance < minDistance) {
          isOverlapping = true
          break
        }
      }

      if (!isOverlapping) {
        coordinates.push({ x, y })
        break
      }

      angle += angleIncrement
      attempts++
    } while (attempts < maxAttempts)
  }

  return coordinates
}

function hashCode(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
  }
  return hash
}

export function generateShapeID(str: string) {
  const hash = hashCode(str)
  const randomNumber = (Math.abs(hash) % 20) + 1 // Getting a number between 1 and 20
  return randomNumber
}

export const toFixedNumber = (num: number, digits: number) => {
  const pow = Math.pow(10, digits)
  return Math.round(num * pow) / pow
}

const flattenRanking = (input: CollectionRanking) => {
  const result: { RPGF3Id: string; share: number }[] = []
  for (let i = 0; i < input.ranking.length; i++) {
    const row = input.ranking[i]
    if (row.type === 'project' || row.type === 'composite project')
      result.push({ RPGF3Id: row.RPGF3Id!, share: row.share })
    if (row.hasRanking) result.push(...flattenRanking(row))
  }

  return result
}

export const convertRankingToAttestationFormat = async (
  ranking: CollectionRanking,
  collectionName: string,
  collectionDescription: string,
) => {
  const totalOp = 3e7

  const obj = {
    listDescription:
      `${collectionDescription} Submitted by Pairwise.`,
    impactEvaluationLink: 'https://pairwise.vote',
    impactEvaluationDescription:
      `This list has been carefully curated and ranked by Pairwise among projects related to ${collectionName}.`,
    listContent: flattenRanking(ranking)
      .map((item) => ({
        RPGF3_Application_UID: item.RPGF3Id,
        OPAmount: Math.floor(totalOp * item.share),
      }))
      .filter((el) => el.OPAmount > 0),
  }

  const listName = collectionName
  const listMetadataPtrType = 1

  const url = await pinFileToIPFS(obj)

  return {
    listName,
    listMetadataPtrType,
    listMetadataPtr: `https://ipfs.io/ipfs/${url}`,
  }
}

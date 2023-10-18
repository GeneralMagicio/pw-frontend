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
  const result: { id: number; share: number }[] = []
  for (let i = 0; i < input.ranking.length; i++) {
    const row = input.ranking[i]
    if (row.type === 'project' || row.type === 'composite project')
      result.push({ id: row.id, share: row.share })
    if (row.hasRanking) result.push(...flattenRanking(row))
  }

  return result
}

export const convertRankingToAttestationFormat = (
  ranking: CollectionRanking
) => {
  const totalOp = 3e7

  const obj = {
    listDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id luctus eros. In molestie non elit molestie consequat. Duis gravida, urna ut dictum lacinia, dolor libero fermentum nulla, vel porta metus purus a nulla. Aenean ut dictum metus. Vivamus fermentum lorem fringilla, ultricies nunc eget, commodo leo. Proin ac ultricies augue.',
    impactEvaluationLink: 'https://example.com/impact1',
    impactEvaluationDescription:
      'Donec vel maximus mi. Etiam vulputate at libero a euismod. Fusce id pulvinar dui. Etiam sit amet suscipit mauris. Donec viverra mauris elit. Cras at luctus libero, ac euismod sem. Etiam quis leo vestibulum tellus tincidunt bibendum vitae ac libero.',
    listContent: flattenRanking(ranking)
      .map((item) => ({
        RPGF3_Application_UID: item.id,
        OPAmount: totalOp * item.share,
      }))
      .filter((el) => el.OPAmount > 0),
  }

  const listName = 'List created by Pairwise'
  const listMetadataPtrType = 1

  console.log('list:', obj.listContent)

  return {
    listName,
    listMetadataPtrType,
    listMetadataPtr:
      'https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/',
  }
}

export function formatMilliseconds(milliseconds: number): string {
  const seconds: number = Math.floor(milliseconds / 1000)
  const minutes: number = Math.floor(seconds / 60)
  const hours: number = Math.floor(minutes / 60)
  const days: number = Math.floor(hours / 24)

  const remainingHours: number = hours % 24
  const remainingMinutes: number = minutes % 60

  return `${
    days ? `${days} days, ` : ''
  }${remainingHours} hours and ${remainingMinutes} minutes`
}

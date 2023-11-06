import { axiosInstance } from '@/utils/axiosInstance'
import { CollectionRanking } from '../edit-logic/edit'

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

export const pinFileToIPFS = async (list: object) => {
  try {
    const res = await axiosInstance.post<string>('/flow/pinJSONToIPFS', {
      json: list,
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
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
    impactCategory: ['PAIRWISE'],
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

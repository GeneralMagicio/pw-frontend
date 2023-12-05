import axios from 'axios';
import { CollectionRanking } from '../edit-logic/edit'
import { axiosInstance } from '@/utils/axiosInstance'
import { Ranking } from '@/components/Custom/RankingConfirmationModal';

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

const createListName = (collectionName: string) => {
  // TODO: It'd be better if a collection being an Individual or a Project is determined in the backend.
  // TODO: If collection names change in the database, the below array should also reflect that change.
  const individualCategories = [
    'International & Multilingual Support',
    'Content Creation & Media',
    'Governance Tokenomics and Analytics',
    'Security & Cross-Chain Solutions',
    'User Experience & Adoption',
    'Blockchain Education',
    'NFTs',
    'Development & Infrastructure',
    'Community Building',
  ]

  return individualCategories.includes(collectionName)
    ? `${collectionName} - Individuals`
    : collectionName
}

export const convertRankingToAttestationFormat = async (
  ranking: CollectionRanking,
  collectionName: string,
  collectionDescription: string
) => {
  const totalOp = 3e7

  const obj = {
    listDescription: `${collectionDescription} Submitted by Pairwise.`,
    impactEvaluationLink: 'https://pairwise.vote',
    impactCategory: ['PAIRWISE'],
    impactEvaluationDescription: `This list has been carefully curated and ranked by Pairwise among projects related to ${collectionName}.`,
    listContent: flattenRanking(ranking)
      .map((item) => ({
        RPGF3_Application_UID: item.RPGF3Id,
        OPAmount: Math.floor(totalOp * item.share),
      }))
      .filter((el) => el.OPAmount > 0),
  }

  const listName = createListName(collectionName)
  const listMetadataPtrType = 1

  const url = await pinFileToIPFS(obj)

  return {
    listName,
    listMetadataPtrType,
    listMetadataPtr: `https://giveth.mypinata.cloud/ipfs/${url}`,
  }
}

export const convertCustomRankingToAttestationFormat = async (
  ranking: Ranking,
  collectionName: string,
  collectionDescription: string
) => {
  const totalOp = 3e7

  const obj = {
    listDescription: `${collectionDescription} Submitted by Pairwise.`,
    impactEvaluationLink: 'https://pairwise.vote',
    impactCategory: ['PAIRWISE'],
    impactEvaluationDescription: `This list has been carefully curated and ranked by Pairwise among projects related to ${collectionName}.`,
    listContent: ranking.ranking!
      .map((item) => ({
        RPGF3_Application_UID: item.RPGF3Id,
        OPAmount: Math.floor(totalOp * item.share),
      }))
      .filter((el) => el.OPAmount > 0),
  }

  const listName = createListName(collectionName)
  const listMetadataPtrType = 1

  const url = await pinFileToIPFS(obj)

  return {
    listName,
    listMetadataPtrType,
    listMetadataPtr: `https://giveth.mypinata.cloud/ipfs/${url}`,
  }
}

export const getPrevAttestationIds = async (
  address: string,
  schemaId: string,
  gqlUrl: string,
  collectionName: string
): Promise<string[]> => {
  const query = `
  query ExampleQuery($where: AttestationWhereInput) {
    groupByAttestation(
      where: $where,
      by: [id, decodedDataJson]
    ) {
      id
      decodedDataJson
    }
  }
`

  const res = await axiosInstance.post(gqlUrl, {
    query: query,
    operationName: 'ExampleQuery',
    variables: {
      where: {
        revocable: { equals: true },
        revoked: { equals: false },
        schemaId: {
          equals: schemaId,
        },
        attester: { equals: address },
      },
      by: null,
    },
  })

  const temp = res.data.data.groupByAttestation.map((item: any) => ({
    ...item,
    data: JSON.parse(item.decodedDataJson),
  }))

  return temp
    .filter(
      (item: any) =>
        item.data[0].value.value === collectionName ||
        item.data[0].value.value === createListName(collectionName)
    )
    .map((item: any) => item.id)
}

export const getListMetadataPtrUids = async (
  id: string,
  gqlUrl: string,
): Promise<string[]> => {
  const query = `
  query Query($where: AttestationWhereInput) {
    findFirstAttestation(
      where: $where,
    ) {
      id
      decodedDataJson
    }
  }
`
  let res : any;
  try {
    res = await axios.post(gqlUrl, {
      query: query,
      operationName: 'Query',
      variables: {
        where: {
          revoked: { equals: false },
          id: {
            equals: id,
          },
          schemaId: {
            equals: "0x3e3e2172aebb902cf7aa6e1820809c5b469af139e7a4265442b1c22b97c6b2a5",
          },
        },
      },
    })

  } catch (e: any) {
    console.error(e.data)
  }


  // console.log("res.data", res.data)

  const json = res.data.data.findFirstAttestation.decodedDataJson

  const dataLink = JSON.parse(json).find((item: any) => item.name === "listMetadataPtr").value.value

  const res2 = await axios.get(dataLink)

  // console.log("value:", dataLink)

  return res2.data.listContent.map((el: any) => el.RPGF3_Application_UID)
}

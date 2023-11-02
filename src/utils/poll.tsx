import { axiosInstance } from './axiosInstance'
import { PairsType } from '@/types/Pairs'
import { RankingResponse } from '@/types/Ranking/index'
import { CollectionRanking } from '@/components/Poll/Rankings/edit-logic/edit'
import { PairType } from '@/types/Pairs/Pair'

export async function fetchPairs(cid?: string) {
  const url = '/flow/pairs'
  return axiosInstance
    .get<PairsType>(url, {
      params: {
        cid,
      },
    })
    .then((res) => res.data)
}

export async function voteProjects({
  id1,
  id2,
  pickedId,
}: {
  id1: number
  id2: number
  pickedId: number | null
}) {
  return axiosInstance
    .post('/flow/projects/vote', {
      project1Id: id1,
      project2Id: id2,
      pickedId,
    })
    .then((res) => res.data)
}

export async function getRankings(cid?: string) {
  return axiosInstance
    .get<CollectionRanking>(`/flow/ranking`, {
      params: { cid: cid === 'root' ? null : cid },
    })
    .then((res) => res.data)
}

export async function getOverallRanking() : Promise<CollectionRanking> {
  const {data} = await axiosInstance.get<CollectionRanking[]>(
    `/flow/ranking/overall`
  )
  return {
    id: -1,
    name: "root",
    ranking: data,
    share: 1,
    // isFinished: true,
    type: "collection",
    hasRanking: true,
  }
  // return data
}

export async function getCollection(id: number) : Promise<PairType> {
  const {data} = await axiosInstance.get(`/collection/${id}`)
  return data.collection;
}
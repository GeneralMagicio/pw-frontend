import { User } from '@/types/user/User'
import { axiosInstance } from './axiosInstance'
import { PairsType } from '@/types/Pairs'
import { RankingsType } from '@/types/Ranking/indes'

export async function fetchPairs(cid: number) {
  return axiosInstance
    .get<PairsType>('/flow/pairs', {
      params: { cid: cid },
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
export async function voteColletions({
  id1,
  id2,
  pickedId,
}: {
  id1: number
  id2: number
  pickedId: number | null
}) {
  return axiosInstance
    .post('/flow/collections/vote', {
      collection1Id: id1,
      collection2Id: id2,
      pickedId,
    })
    .then((res) => res.data)
}

export async function getRankings(cid: number) {
  return axiosInstance
    .get<RankingsType>(`/flow/ranking`, { params: { cid } })
    .then((res) => res.data)
}

import { User } from '@/types/user/User'
import { axiosInstance } from './axiosInstance'
import { PairsType, PollType } from '@/types/Pairs'
import { OverallRankingType, RankingResponse } from '@/types/Ranking/index'

export async function fetchPairs(cid?: string) {
  const url =
    cid === PollType.EXPERTISE ? '/flow/expertise/pairs' : '/flow/pairs'
  return axiosInstance
    .get<PairsType>(url, {
      params: {
        cid: cid === PollType.EXPERTISE || cid === PollType.IMPACT ? null : cid,
      },
    })
    .then((res) => res.data)
}

export async function fetchSubProjectPairs(pid: string) {
  const url = `/flow/subprojects/pairs`
  return axiosInstance
    .get<PairsType>(url, {
      params: {
        pid,
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

export async function voteSubProjects({
  id1,
  id2,
  pickedId,
}: {
  id1: number
  id2: number
  pickedId: number | null
}) {
  return axiosInstance
    .post('/flow/subprojects/vote', {
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

export async function voteExpertise({
  id1,
  id2,
  pickedId,
}: {
  id1: number
  id2: number
  pickedId: number | null
}) {
  return axiosInstance
    .post('/flow/expertise/vote', {
      collection1Id: id1,
      collection2Id: id2,
      pickedId,
    })
    .then((res) => res.data)
}
export async function getRankings(cid?: string) {
  return axiosInstance
    .get<RankingResponse>(`/flow/ranking`, {
      params: { cid: cid === 'root' ? null : cid },
    })
    .then((res) => res.data)
}

export async function getCompositeProjectRankings(pid: string) {
  return axiosInstance
    .get<RankingResponse>(`/flow/subprojects/ranking`, {
      params: { pid },
    })
    .then((res) => res.data)
}

export async function getOverallRanking() {
  const {data} = await axiosInstance.get<OverallRankingType[]>(
    `/flow/ranking/overall`
  )
  return data
}

export async function getLastTimestamp() {
  const {data} = await axiosInstance.get<number>(
    `/flow/ts`
  )
  return data
}

export async function getExpertiseRankings() {
  return axiosInstance
    .get<RankingResponse>(`/flow/expertise/ranking`)
    .then((res) => res.data)
}

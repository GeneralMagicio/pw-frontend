import { PairType } from '@/types/Pairs/Pair'
import { axiosInstance } from './axiosInstance'
import { FlowStatus } from '@/types/Flow'

export async function fetchCollectionsTemp() {
  return axiosInstance
    .get<PairType[]>('/flow/collectionsTemp', {
      params: { cid: null },
    })
    .then((res) => res.data)
}

export async function fetchCollections(cid?: string) {
  return axiosInstance
    .get<PairType[]>('/flow/collections', {
      params: { cid: cid === 'root' ? null : cid },
    })
    .then((res) => res.data)
}

export async function fetchCompositeProjects(cid: string) {
  return axiosInstance
    .get<PairType[]>('/flow/compositeProjects', {
      params: { cid },
    })
    .then((res) => res.data)
}

export async function getFlowStatus() {
  return axiosInstance.get<FlowStatus>('/flow/status').then((res) => res.data)
}

export async function getFlowProgress() {
  return axiosInstance.get<number>('/flow/progress').then((res) => res.data)
}

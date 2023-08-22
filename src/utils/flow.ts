import { PairType } from '@/types/Pairs/Pair'
import { axiosInstance } from './axiosInstance'
import { FlowStatus } from '@/types/Flow'

export async function fetchCollections(cid?: string) {
  return axiosInstance
    .get<PairType[]>('/flow/collections', {
      params: { cid: cid === 'root' ? null : cid },
    })
    .then((res) => res.data)
}
export async function getFlowStatus(cid?: string) {
  return axiosInstance
    .get<FlowStatus>('/flow/status', {
      params: { cid: cid === 'root' ? null : cid },
    })
    .then((res) => res.data)
}

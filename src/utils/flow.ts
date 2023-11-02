import { PairType } from '@/types/Pairs/Pair'
import { axiosInstance } from './axiosInstance'

export async function fetchCollections(cid?: string) {
  return axiosInstance
    .get<PairType[]>('/flow/collections', {
      params: { cid: cid === 'root' ? null : cid },
    })
    .then((res) => res.data)
}
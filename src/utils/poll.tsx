import { User } from '@/types/user/User'
import { axiosInstance } from './axiosInstance'
import { PairsType } from '@/types/Pairs'

export async function fetchPairs(cid: number) {
  try {
    const { data } = await axiosInstance.get<PairsType>(
      '/flow/projects/pairs',
      {
        params: { cid: cid },
      }
    )
    return data
  } catch (err) {
    console.error(err)
  }
}
export async function voteProjects(body: {
  project1Id: number
  project2Id: number
  pickedId: number | null
}) {
  try {
    const { data } = await axiosInstance.post('/flow/projects/vote', body)
    return data
  } catch (err) {
    console.error(err)
  }
}

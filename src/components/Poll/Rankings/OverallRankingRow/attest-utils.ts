import { axiosInstance } from '@/utils/axiosInstance'

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

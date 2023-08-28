import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BASE_URL || 'https://pairwise.cupofjoy.store',
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
})

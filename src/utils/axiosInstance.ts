import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BASE_URL || 'https://pairwise.cupofjoy.store',
    // process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:7070',
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
})

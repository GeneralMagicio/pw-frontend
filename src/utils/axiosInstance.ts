import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL:
    // process.env.NEXT_PUBLIC_BASE_URL || 'https://pairwise.cupofjoy.store',
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:7070',
  // withCredentials: "s",
  headers: {
    'Content-type': 'application/json',
  },
})

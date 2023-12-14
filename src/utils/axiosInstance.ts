import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL:
    // process.env.NEXT_PUBLIC_BASE_URL || 'https://pwrd.cupofjoy.store',
    process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:7070',
  // withCredentials: "s",
  headers: {
    'Content-type': 'application/json',
  },
})

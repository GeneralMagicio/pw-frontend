import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://pairwise.iran.liara.run/',
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
})

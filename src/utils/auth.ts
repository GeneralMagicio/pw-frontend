import { SiweMessage } from 'siwe'
import { User } from '@/types/user/User'
import { axiosInstance } from './axiosInstance'

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      window.localStorage.removeItem('auth')
      window.localStorage.removeItem('loggedInAddress')
      if (axiosInstance.defaults.headers.common['auth']) {
        delete axiosInstance.defaults.headers.common['auth']
      }
    }
    return Promise.reject(error)
  }
)

export const isLoggedIn = async () => {
  try {
    const { data } = await axiosInstance.get<User>('/auth/isloggedin')
    return data
  } catch (err) {
    return false
  }
}

const fetchNonce = async () => {
  try {
    const { data } = await axiosInstance.get<string>('/auth/nonce')
    return data
  } catch (err) {
    console.error(err)
  }
}

export const login = async (
  chainId: number,
  address: string,
  signFunction: (args?: any) => Promise<`0x${string}` | undefined>
) => {
  try {
    const nonce = await fetchNonce()

    const message = new SiweMessage({
      domain: window.location.host,
      address,
      statement: 'Sign in with Ethereum to Pairwise.',
      uri: window.location.origin,
      version: '1',
      chainId,
      nonce,
    })

    const signature = await signFunction({
      message: message.prepareMessage(),
    })

    // Verify signature
    const verifyRes = await axiosInstance.post('/auth/login', {
      ...{ message, signature },
    })

    window.localStorage.setItem('auth', verifyRes.data)
    window.localStorage.setItem('loggedInAddress', address)
    axiosInstance.defaults.headers.common['auth'] = verifyRes.data
    return verifyRes
  } catch (error) {
    throw error
  }
}

export const logout = async () => {
  try {
    window.localStorage.removeItem('auth')
    window.localStorage.removeItem('loggedInAddress')
    if (axiosInstance.defaults.headers.common['auth']) {
      delete axiosInstance.defaults.headers.common['auth']
    }
    await axiosInstance.post('/auth/logout')
  } catch (err) {
    console.error(err)
  }
}

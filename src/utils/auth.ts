import { User } from '@/types/user/User'
import { axiosInstance } from './axiosInstance'
import { SiweMessage } from 'siwe'

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
  signFunction: (args?: any) => Promise<`0x${string}`>
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
    return verifyRes
  } catch (error) {
    console.error('ERROR', error)
  }
}

export const logout = async () => {
  try {
    await axiosInstance.post('/auth/logout')
    localStorage.removeItem('editedRanking')
  } catch (err) {
    console.error(err)
  }
}

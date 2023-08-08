import { ReactNode, useEffect } from 'react'
import { Header } from './Header'
import { login } from '@/utils/auth'
import { axiosInstance } from '@/utils/axiosInstance'
import axios, { AxiosError } from 'axios'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { Grid } from '../Icon/Grid'
import cn from 'classnames'

interface MainLayoutProps {
  children: ReactNode
  className: string
}

export function MainLayout({ children, className }: MainLayoutProps) {
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { signMessageAsync } = useSignMessage()

  useEffect(() => {
    // Add a response interceptor
    axiosInstance.interceptors.response.use(
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
      },
      async (error) => {
        if (!error) return
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const originalRequest = error.config

        if (error?.response?.status === 401 && !originalRequest?._retry) {
          originalRequest._retry = true
          if (chain?.id && address) {
            await login(chain.id, address, signMessageAsync)
          }
          return axios(originalRequest)
        }

        return Promise.reject(error)
      }
    )
  }, [address, chain, signMessageAsync])

  return (
    <>
      <div
        className={cn(
          className,
          'main-layout flex min-h-screen shrink-0 flex-col  text-white font-IBM'
        )}>
        <Header />
        <div className="mx-auto w-full  grow ">{children}</div>
      </div>
    </>
  )
}

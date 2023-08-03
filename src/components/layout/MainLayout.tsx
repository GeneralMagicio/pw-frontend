import { ReactNode, useEffect } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { login } from '@/utils/auth'
import { axiosInstance } from '@/utils/axiosInstance'
import axios, { AxiosError } from 'axios'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {

  const { address } = useAccount()
  const { chain } = useNetwork()
  const { signMessageAsync } = useSignMessage()
  
  useEffect(() => {
    // Add a response interceptor
    axiosInstance.interceptors.response.use((response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, async (error) => {
      if (!error) return;
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const originalRequest = error.config;


      if (error?.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true;
        if (chain?.id && address) {
          await login(chain.id, address, signMessageAsync);
        }
        return axios(originalRequest);
      }

      return Promise.reject(error);
    });
  }, [address, chain, signMessageAsync])
  
  return (
    <div className="min-h-screen bg-zinc-800 text-white">
      <Header />
      <div className="mx-auto min-h-screen-content max-w-7xl p-8">
        {children}
      </div>
      <Footer />
    </div>
  )
}

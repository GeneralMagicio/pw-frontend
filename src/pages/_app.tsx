import '@/styles/globals.css'

import { useEffect, useLayoutEffect, useState } from 'react'

import type { AppProps } from 'next/app'
import { AuthGuard } from '@/components/Auth/AuthGuard'
import { MainLayout } from '@/components/layout/MainLayout'
import { Seo } from '@/components/layout/Seo'
import { Web3Provider } from '@/providers/Web3'
import { axiosInstance } from '@/utils/axiosInstance'
import cn from 'classnames'
import localFont from 'next/font/local'
import { useWindowWidth } from '@react-hook/window-size'

const IBMFont = localFont({
  src: [
    {
      path: '../../public/fonts/IBM_Plex_Mono/IBMPlexMono-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/IBM_Plex_Mono/IBMPlexMono-Medium.ttf',
      weight: '500',
    },
    {
      path: '../../public/fonts/IBM_Plex_Mono/IBMPlexMono-SemiBold.ttf',
      weight: '600',
    },
    {
      path: '../../public/fonts/IBM_Plex_Mono/IBMPlexMono-Bold.ttf',
      weight: '700',
    },
  ],
  variable: '--font-IBM',
})
const InterFont = localFont({
  src: [
    {
      path: '../../public/fonts/Inter/Inter-Regular.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/Inter/Inter-Medium.ttf',
      weight: '500',
    },

    {
      path: '../../public/fonts/Inter/Inter-SemiBold.ttf',
      weight: '600',
    },

    {
      path: '../../public/fonts/Inter/Inter-Bold.ttf',
      weight: '700',
    },
  ],
  variable: '--font-Inter',
})

export default function App({ Component, pageProps }: AppProps) {
  useLayoutEffect(() => {
    const token = window.localStorage.getItem('auth')
    if (token) {
      axiosInstance.defaults.headers.common['auth'] = `${token}`
    }
  }, [])
  const [smallscreen, setSmallScreen] = useState(false)
  const width = useWindowWidth()

  useEffect(() => {
    if (width < 1024) {
      setSmallScreen(true)
    } else {
      setSmallScreen(false)
    }
  }, [width])

  if (smallscreen) {
    return (
      <div className="main-layout flex min-h-screen shrink-0 flex-col items-center justify-center bg-cover bg-no-repeat font-IBM text-black">
        <div className="flex w-96 flex-col gap-3 p-10 text-center">
          <div className="text-xl font-bold">Large screens only</div>
          Pairwise is not currently available on mobile and tablet devices.
          Please visit on a desktop or laptop computer.
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className={cn(IBMFont.variable, InterFont.variable)}
        id="font-container">
        <Seo />
        <Web3Provider>
          <AuthGuard>
            <MainLayout className="">
              <Component {...pageProps} />
            </MainLayout>
          </AuthGuard>
        </Web3Provider>
      </div>
    </>
  )
}

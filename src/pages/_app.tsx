import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MainLayout } from '@/components/layout/MainLayout'
import { Seo } from '@/components/layout/Seo'
import { Web3Provider } from '@/providers/Web3'
import localFont from 'next/font/local'
import cn from 'classnames'

const IBMFont = localFont({
  src: [
    {
      path: '../../public/fonts/IBM_Plex_Mono/IBMPlexMono-Regular.ttf',
      weight: '400',
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
  return (
    <>
      <Seo />
      <Web3Provider>
        <MainLayout className={cn(IBMFont.variable, InterFont.variable)}>
          <Component {...pageProps} />
        </MainLayout>
      </Web3Provider>
    </>
  )
}

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MainLayout } from '@/components/layout/MainLayout'
import { Seo } from '@/components/layout/Seo'
import { Web3Provider } from '@/providers/Web3'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Seo />
      <Web3Provider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Web3Provider>
    </>
  )
}

import '@rainbow-me/rainbowkit/styles.css'

import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { SITE_NAME, WEB3_CHAINS } from '@/utils/config'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'

import { ReactNode } from 'react'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  WEB3_CHAINS,
  [
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_QUICKNODE_HTTP_PROVIDER_URL || ''
      }),
    }),
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY || '' }),
    publicProvider(),
  ]
)
const { connectors } = getDefaultWallets({
  appName: SITE_NAME,
  chains,
  projectId: '55df23aa617b4f9c344451b907c660d1',
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

interface Web3ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

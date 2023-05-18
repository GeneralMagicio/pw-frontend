import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { SITE_NAME, WEB3_CHAINS } from '@/utils/config'
import { ReactNode } from 'react'
import '@rainbow-me/rainbowkit/styles.css'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  WEB3_CHAINS,
  [publicProvider()]
)
const { connectors } = getDefaultWallets({
  appName: SITE_NAME,
  chains,
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
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  )
}

import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { SITE_NAME, WEB3_CHAINS } from '@/utils/config'
import { ReactNode } from 'react'
import '@rainbow-me/rainbowkit/styles.css'

const { chains, provider } = configureChains(WEB3_CHAINS, [publicProvider()])
const { connectors } = getDefaultWallets({
  appName: SITE_NAME,
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

interface Web3ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  )
}

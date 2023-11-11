import { providers } from 'ethers'
import { useState, useEffect } from 'react'
import type { Address } from 'viem'
import { type WalletClient } from '@wagmi/core'
import { useWalletClient } from 'wagmi'
import type { JsonRpcSigner } from '@ethersproject/providers'

export type EASConfig = {
  EASDeployment: Address
  SchemaRegistry: Address
}

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new providers.Web3Provider(transport as any, network)
  const signer = provider.getSigner(account.address)

  return signer
}

export function useSigner() {
  const { data: walletClient } = useWalletClient()

  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined)
  useEffect(() => {
    async function getSigner() {
      if (!walletClient) return

      const tmpSigner = walletClientToSigner(walletClient)

      setSigner(tmpSigner)
    }

    void getSigner()
  }, [walletClient])
  return signer
}

interface Config extends EASConfig {
  explorer: string;
  gqlUrl: string;
}

export const EASNetworks: Record<number, Config> = {
  // Mainnet
  1: {
    EASDeployment: '0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587',
    SchemaRegistry: '0xA7b39296258348C78294F95B872b282326A97BDF',
    explorer: 'https://easscan.org/',
    gqlUrl: 'https://easscan.org/graphql'
  },
  // Arbitrum One
  42161: {
    EASDeployment: '0xbD75f629A22Dc1ceD33dDA0b68c546A1c035c458',
    SchemaRegistry: '0xA310da9c5B885E7fb3fbA9D66E9Ba6Df512b78eB',
    explorer: 'https://optimism-goerli-bedrock.easscan.org',
    gqlUrl: '	https://arbitrum.easscan.org/graphql'
  },
  // Sepolia Testnet
  421611: {
    EASDeployment: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
    SchemaRegistry: '0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0',
    explorer: 'https://optimism-goerli-bedrock.easscan.org',
    gqlUrl: 'https://sepolia.easscan.org/graphql'
  },
  // Optimism
  10: {
    EASDeployment: '0x4200000000000000000000000000000000000021',
    SchemaRegistry: '0x4200000000000000000000000000000000000020',
    explorer: 'https://optimism.easscan.org',
    gqlUrl: 'https://optimism.easscan.org/graphql'
  },
  // Optimism Testnet Goerli
  420: {
    EASDeployment: '0x4200000000000000000000000000000000000021',
    SchemaRegistry: '0x4200000000000000000000000000000000000020',
    explorer: 'https://optimism-goerli-bedrock.easscan.org',
    gqlUrl: 'https://optimism-goerli-bedrock.easscan.org/graphql'
  },
  // Goerli
  5: {
    EASDeployment: '0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A',
    SchemaRegistry: '0x720c2bA66D19A725143FBf5fDC5b4ADA2742682E',
    explorer: 'https://optimism-goerli-bedrock.easscan.org',
    gqlUrl: 'https://optimism-goerli-bedrock.easscan.org/graphql'
  },
}

export const SCHEMA_UID =
  '0x3e3e2172aebb902cf7aa6e1820809c5b469af139e7a4265442b1c22b97c6b2a5'

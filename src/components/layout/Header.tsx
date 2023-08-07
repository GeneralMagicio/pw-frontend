import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SITE_NAME } from '@/utils/config'
import { useEffect, useRef } from 'react';
import { useAccount, useNetwork, useSignMessage } from 'wagmi';
import { login, logout } from '@/utils/auth';

export function Header() {
  const {isConnected} = useAccount()
  const previousIsConnected = useRef<boolean | null>(null)

  const { address } = useAccount()
  const { chain } = useNetwork()
  const { signMessageAsync } = useSignMessage()
   
  useEffect(() => {
    const main = async () => {
        // automatic login when the user connects their wallet
      if (isConnected && previousIsConnected.current === false) {
        await login(chain!.id, address!, signMessageAsync)
        
        // automatic logout when the user disconnects their wallet
      } else if (!isConnected && previousIsConnected.current === true) {
        await logout()
      }
  
      previousIsConnected.current = isConnected
    }

    main()
  }, [isConnected, address, chain, signMessageAsync])
  

  return (
    <header className="flex h-24 items-center justify-between bg-zinc-900 px-5">
      <Link href="/">
        <h1 className="text-xl font-semibold transition duration-150 hover:text-gray-400">
          {SITE_NAME}
        </h1>
      </Link>
      <ConnectButton />
    </header>
  )
}

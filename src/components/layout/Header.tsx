import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SITE_NAME } from '@/utils/config'
import { useEffect, useRef } from 'react'
import cn from 'classnames'
import { useAccount, useNetwork, useSignMessage, useSwitchNetwork } from 'wagmi'
import { login, logout } from '@/utils/auth'
import { Logo } from '../Icon/Logo'
import { useRouter } from 'next/router'

export function Header() {
  const router = useRouter()
  const { isConnected } = useAccount()
  const previousIsConnected = useRef<boolean | null>(null)

  const { address } = useAccount()
  const { chain } = useNetwork()
  const { signMessageAsync } = useSignMessage()
  const { chains, switchNetworkAsync } = useSwitchNetwork()

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
  }, [isConnected, address, chain, signMessageAsync, router])
  useEffect(() => {
    if (isConnected && !router.pathname.includes('poll')) router.push('/poll/1')
  }, [isConnected])

  return (
    <header className="z-10 flex h-24 items-center justify-between bg-gray-4 px-5">
      <Link href="/">
        <div className="ml-20">
          <Logo />
        </div>
      </Link>
      <ConnectButton.Custom>
        {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
          const connected = mounted && account && chain
          if (!connected) {
            return (
              <button
                className={'min-w-[120px] rounded-full  bg-red px-4 py-3'}
                onClick={openConnectModal}>
                <span className={cn('text-white font-bold')}>
                  Connect Wallet
                </span>
              </button>
            )
          }
          return (
            <button
              className="min-w-[120px] rounded-full border border-black bg-transparent px-4 py-3 text-black"
              onClick={async () => {
                if (chains[0]?.id !== chain?.id) {
                  await switchNetworkAsync?.(chains[0]?.id)
                }
                openAccountModal && openAccountModal()
              }}>
              <span className="font-bold">{account.displayName}</span>
            </button>
          )
        }}
      </ConnectButton.Custom>
    </header>
  )
}

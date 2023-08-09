import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SITE_NAME } from '@/utils/config'
import { useEffect, useRef } from 'react'
import cn from 'classnames'
import { useAccount, useNetwork, useSignMessage, useSwitchNetwork } from 'wagmi'
import { login, logout } from '@/utils/auth'
import { Logo } from '../Icon/Logo'
import { useRouter } from 'next/router'
import { ConnectWalletButton } from '../ConnectWalletButton'

export function Header() {
  return (
    <header className="z-10 flex h-24 items-center justify-between bg-gray-4 px-5">
      <Link href="/">
        <div className="ml-20">
          <Logo />
        </div>
      </Link>
      <ConnectWalletButton />
    </header>
  )
}

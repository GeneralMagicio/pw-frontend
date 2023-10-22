import Link from 'next/link'
import { Logo } from '@/components/Icon/Logo'
import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import { useSession } from '@/context/session'
import cn from 'classnames'
import { useState } from 'react'

export function Header() {
  const { user } = useSession()

  const [showButton, setShowButton] = useState(false)

  return (
    <header
      className="z-[100] flex h-[60px] items-center justify-between bg-gray-4 px-10"
      onMouseLeave={() => setShowButton(false)}>
      <Link href="/">
        <div className="ml-20">
          <Logo />
        </div>
      </Link>
      <div className="relative">
        <div onMouseEnter={() => setShowButton(true)}>
          <ConnectWalletButton className="h-[36px] bg-red" />
        </div>
        {user && showButton && (
          <div
            className={cn(
              'absolute right-0 top-12 whitespace-nowrap rounded-2xl bg-white px-10 py-6  text-black')}>
            <Link href="/profile">
              <span className="cursor-pointer hover:underline">My account</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

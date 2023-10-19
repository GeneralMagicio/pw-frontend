import Link from 'next/link'
import { Logo } from '@/components/Icon/Logo'
import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import { useSession } from '@/context/session'
import cn from 'classnames'
import { useState } from 'react'
import { formatMilliseconds } from '@/utils/helpers'
import useCountdown from '@/hooks/useCountDown'
import { PAIRWISE_RELEASE_DATE } from '@/utils/contants'

export function Header() {
  const { user } = useSession()
  const [count] = useCountdown(PAIRWISE_RELEASE_DATE.valueOf() - Date.now())

  const [showButton, setShowButton] = useState(false)

  return (
    <header
      className="z-10 flex h-[90px] items-center justify-between bg-gray-4 px-10"
      onMouseLeave={() => setShowButton(false)}>
      <Link href="/">
        <div className="ml-20">
          <Logo />
        </div>
      </Link>
      <div className="relative">
        {count > 0 ? (
          <button className="flex h-[45px] min-w-[200px] items-center justify-center rounded-full border border-red bg-transparent px-6 font-Inter text-red">
            {formatMilliseconds(count)}
          </button>
        ) : (
          <div onMouseEnter={() => setShowButton(true)}>
            <ConnectWalletButton className="h-[36px] bg-red" />
          </div>
        )}

        {user && showButton && (
          <div
            className={cn(
              'absolute right-0 top-12 whitespace-nowrap rounded-2xl bg-white px-10 py-6  text-black'
            )}>
            <Link href="/profile">
              <span className="cursor-pointer hover:underline">My account</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

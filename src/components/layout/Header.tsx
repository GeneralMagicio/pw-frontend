import Link from 'next/link'
import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import { useSession } from '@/context/session'
import { useState } from 'react'
import Image from 'next/image'

export function Header() {
  const { user } = useSession()

  const [showButton, setShowButton] = useState(false)

  return (
    <header
      className="z-[100] flex h-[60px] items-center justify-between bg-gray-4 px-10"
      onMouseLeave={() => setShowButton(false)}>
      <Link href="/">
        <div className="ml-20">
          <Image
            alt="Pairwise"
            height={100}
            src="/images/pairwise-logo.svg"
            width={150}
          />
        </div>
      </Link>
      <div className="relative">
        <div onMouseEnter={() => setShowButton(true)}>
          <ConnectWalletButton className="h-[36px] bg-red" />
        </div>
      </div>
    </header>
  )
}

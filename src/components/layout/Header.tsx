import Link from 'next/link'
import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import Image from 'next/image'

export function Header() {
  return (
    <header className="z-30 flex h-[60px] items-center justify-between bg-gray-4 px-10">
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
        <ConnectWalletButton className="h-[36px] bg-red" />
      </div>
    </header>
  )
}

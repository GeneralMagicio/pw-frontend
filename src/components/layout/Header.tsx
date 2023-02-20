import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SITE_NAME } from '@/utils/config'

export function Header() {
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

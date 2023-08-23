import Link from 'next/link'
import { Logo } from '@/components/Icon/Logo'
import { ConnectWalletButton } from '@/components/ConnectWalletButton'

export function Header() {
  return (
    <header className="z-10 flex h-[60px] items-center justify-between bg-gray-4 px-10">
      <Link href="/">
        <div className="ml-20">
          <Logo />
        </div>
      </Link>
      <div className="group relative ">
        <ConnectWalletButton className="h-[36px] bg-red" />
        <div className="absolute right-0 top-12 whitespace-nowrap rounded-2xl bg-white px-10 py-6  text-black opacity-0 transition-opacity group-hover:opacity-100">
          <Link href="/profile">
            <span className="cursor-pointer hover:underline">My account</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

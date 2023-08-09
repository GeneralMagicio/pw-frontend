import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div className="relative">
        <Image
          alt="Galaxy"
          className="mx-auto"
          height="1016"
          src="/images/The-op-system.svg"
          width="1289"
        />
        <div className="absolute inset-0 m-auto flex h-[229px] w-[816px] flex-col items-center justify-center gap-4 rounded-2xl bg-gray-10 p-6 font-IBM text-black backdrop-blur-sm">
          <h2 className="text-[32px] font-bold">
            Retroactive Public Goods Funding
          </h2>
          <p className="text-2xl font-medium">
            Changing the way impact is rewarded
          </p>
          <ConnectWalletButton className="bg-black" />
        </div>
        <div className=" absolute inset-0 top-auto m-auto flex h-[229px] w-[816px] flex-col items-center justify-center gap-10 p-6 font-IBM text-black  ">
          <h2 className="text-[48px] font-bold">Are you ready to start?</h2>
          <p className="text-[32px] font-medium">
            Let’s start by connecting your wallet
          </p>
          <ConnectWalletButton className="bg-black" />
        </div>
      </div>
    </>
  )
}

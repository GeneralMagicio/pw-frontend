import { ConnectWalletButton } from '@/components/ConnectWalletButton'

export default function Profile() {
  return (
    <div className="relative m-auto mt-32 flex w-auto max-w-[1158px] flex-col gap-6 rounded-[20px] bg-white px-20  py-10 font-IBM   text-black">
      <div className="flex flex-col items-center justify-center gap-6">
        <header className="mb-2 flex w-full ">
          <ConnectWalletButton className="h-12" />
        </header>
        <div className="flex w-full gap-10 font-Inter">
          <div className="grow rounded-2xl p-6 shadow-card3">
            <h2 className="text-2xl font-bold">Expertise Preference</h2>
          </div>
          <div className="grow rounded-2xl p-6 shadow-card3">
            <h2 className="text-2xl font-bold">Strategic Importance</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

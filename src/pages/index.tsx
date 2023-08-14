import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import { Grid } from '@/components/Icon/Grid'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      {/* <Image
        alt="Galaxy"
        className="absolute inset-0 mx-auto h-full w-full"
        height="1016"
        src="/images/The-op-system.svg"
        width="1289"
      /> */}
      <div className="m-auto mt-28 flex w-[739px] flex-col items-center justify-center gap-6 rounded-2xl text-center font-IBM      leading-[63px] text-black ">
        <h2 className="text-[64px] font-bold text-red">
          Retroactive Public Goods Funding
        </h2>
        <p className="text-2xl ">Changing the way impact is rewarded</p>
        <ConnectWalletButton
          alternativeText="Start voting"
          className="flex h-12 items-center bg-black"
        />
      </div>
      <div className="relative m-auto mb-32 mt-[239px] flex  w-[899px] flex-col items-center justify-center gap-8 p-6 text-center font-IBM text-black  ">
        <Grid className="absolute -top-0" />
        <Image
          alt="Galaxy"
          className=""
          height="272"
          src="/images/happy-sun.svg"
          width="290"
        />
        <h2 className="text-[44px] font-bold">
          {`Your decision is not just wanted, it's needed!`}
        </h2>
        <p className="text-center text-[24px]">
          {`Join the Optimism Collective's mission! With 30 million OP tokens up
          for distribution in the third round of RetroPGF, your vote will shape
          the direction of our collective future.`}
        </p>
        <button className="flex h-12 shrink-0 items-center rounded-[100px] bg-black px-10 text-white">
          Learn now
        </button>
      </div>
    </>
  )
}

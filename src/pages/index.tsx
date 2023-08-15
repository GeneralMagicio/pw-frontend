import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import { ArrowDown } from '@/components/Icon/ArrowDown'
import { CollectionsLeft } from '@/components/Icon/CollectionsLeft'
import { Grid } from '@/components/Icon/Grid'
import { GridWhite } from '@/components/Icon/GridWhite'
import { VectorHorizontal } from '@/components/Icon/VectorHorizontal'
import { VectorHorizontal2 } from '@/components/Icon/VectorHorizontal2'
import { VectorHorizontal3 } from '@/components/Icon/VectorHorizontal3'
import { VectorHorizontal4 } from '@/components/Icon/VectorHorizontal4'
import { Votes } from '@/components/Icon/Votes'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        <Image
          alt="Galaxy"
          className="absolute -right-[150px] h-[584px] w-[686px]"
          height="584"
          src="/images/right-side-planet.svg"
          width="686"
        />
        <Image
          alt="Galaxy"
          className=" mx-auto h-full w-full  max-w-[1041px]"
          height="1016"
          src="/images/center-universe.svg"
          width="1289"
        />
        <div className="absolute inset-0 m-auto mt-28 flex w-[739px] flex-col items-center justify-center gap-6 rounded-2xl text-center font-IBM      leading-[63px] text-black ">
          <h2 className="text-[64px] font-bold text-red">
            Retroactive Public Goods Funding
          </h2>
          <p className="text-2xl ">Changing the way impact is rewarded</p>
          <ConnectWalletButton
            alternativeText="Start voting"
            className="flex h-12 items-center bg-black"
          />
        </div>
        <Image
          alt="Galaxy"
          className="absolute -left-[150px] bottom-0 h-[584px] w-[686px]"
          height="584"
          src="/images/left-side-planet.svg"
          width="686"
        />
      </div>

      <div className="relative m-auto -mt-44 mb-32  flex  w-[899px] flex-col items-center justify-center gap-8 p-6 text-center font-IBM text-black  ">
        <GridWhite className="absolute -top-0" />
        <Image
          alt="Galaxy"
          className="relative"
          height="272"
          src="/images/happy-sun.svg"
          width="290"
        />
        <h2 className="relative text-[44px] font-bold">
          {`Your decision is not just wanted, it's needed!`}
        </h2>
        <p className="relative text-center text-[24px]">
          {`Join the Optimism Collective's mission! With 30 million OP tokens up
          for distribution in the third round of RetroPGF, your vote will shape
          the direction of our collective future.`}
        </p>
        <button className="relative flex h-12 shrink-0 items-center rounded-[100px] bg-black px-10 text-white">
          Learn now
          <ArrowDown className="ml-2" />
        </button>
      </div>
      <div className="relative mx-auto mb-40 w-[871px]">
        <Image
          alt="Galaxy"
          className="absolute -right-1/2 top-[300px]"
          height="1016"
          src="/images/The-op-system.svg"
          width="1289"
        />

        <h2 className="text-center text-[52px] font-bold text-red">
          Begin Your Journey
        </h2>
        <VectorHorizontal className="mx-auto" />
        <div className="my-6 -ml-36 flex w-[494px] flex-col gap-6 rounded-[32px] border border-white px-11 pb-14 pt-24 text-center text-black">
          <h3 className="text-[32px] font-bold">
            Embark on the RetroPGF Odyssey
          </h3>
          <p className="text-lg font-medium">
            Dive into the RetroPGF universe and discover a realm of projects
            that hold the promise of positive change. Browse through our
            collection and get a sneak peek into the potential impact you can
            drive.
          </p>
        </div>
        <VectorHorizontal2 className="mx-auto" />
        <div className="my-6 -mr-32 ml-auto flex w-[494px] flex-col gap-6 rounded-[32px] border border-white px-11 pb-14 pt-24 text-center text-black">
          <h3 className="text-[32px] font-bold">Galactic Governance Awaits</h3>
          <p className="text-lg font-medium">
            Step into the RetroPGF cosmos, where your votes will determine the
            trajectory of projects destined to shape our universe. Each
            selection you make sends ripples through the space of innovation.
          </p>
          <CollectionsLeft className="absolute -left-[350px] -mt-[300px]" />
        </div>
        <VectorHorizontal3 className="mx-auto" />
        <div className="my-6 -ml-36 flex w-[494px] flex-col gap-6 rounded-[32px] border border-white px-11 pb-14 pt-24 text-center text-black">
          <h3 className="text-[32px] font-bold">Unlock More Collections</h3>
          <p className="text-lg font-medium">
            Unleash your influence by voting on the unlocked collection. Your
            votes are your voice, shaping the future of these projects. Every
            click is a step toward making a difference.
          </p>
          {/* <CollectionsRight className="absolute -right-[350px] -mt-[6]" /> */}
        </div>
        <VectorHorizontal4 className="ml-28 mr-auto" />
        <div className="my-6 -ml-36 flex w-[494px] flex-col gap-6 rounded-[32px] border border-white px-11 pb-14 pt-24 text-center text-black">
          <h3 className="text-[32px] font-bold">Check and Modify Your Votes</h3>
          <p className="text-lg font-medium">
            Review and refine your votes at any time. Your opinions matter, and
            we want to make sure your choices reflect your passion for the
            projects that resonate with you.
          </p>
          <Votes className="absolute -right-[350px] -mt-[60px]" />
        </div>
      </div>

      <div className="mx-auto mb-60 flex w-[662px] flex-col items-center justify-center gap-10 text-center">
        <h2 className="text-5xl font-bold text-red">
          Ready to Shape the Galaxy?
        </h2>
        <p className="text-[32px]  font-medium text-black">
          Kickstart Your Journey: Connect Your Wallet Now
        </p>
        <ConnectWalletButton
          alternativeText="Start voting"
          className="flex h-12 items-center bg-black"
        />
      </div>
    </div>
  )
}

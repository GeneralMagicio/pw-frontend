import { ConnectWalletButton } from '@/components/ConnectWalletButton'
import { ArrowDown } from '@/components/Icon/ArrowDown'
import { CollectionsLeft } from '@/components/Icon/CollectionsLeft'
import { CollectionsRight } from '@/components/Icon/CollectionsRight'
import { ColoredGrid } from '@/components/Icon/ColoredGrid'
import { Discord } from '@/components/Icon/Discord'
import { GMIcon } from '@/components/Icon/GMIcon'
import { Github } from '@/components/Icon/Github'
import { Linkedin } from '@/components/Icon/Linkedin'
import { Medium } from '@/components/Icon/Medium'
import { Star } from '@/components/Icon/Star'
import { Twitter } from '@/components/Icon/Twitter'
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
        <Star className="absolute right-80    top-40" />
        <div className="absolute inset-0 m-auto mt-28 flex w-[739px] flex-col items-center justify-center gap-6 rounded-2xl text-center font-IBM      leading-[63px] text-black ">
          <h2 className="text-[64px] font-bold text-red">
            Curate RetroPGF 3 Voting Lists with Pairwise
          </h2>
          <p className="text-2xl ">Impact = Profit</p>
          <ConnectWalletButton
            alternativeText="Start"
            className="flex h-12 items-center bg-black"
          />
        </div>
        <Image
          alt="Galaxy"
          className="absolute -left-[150px] bottom-20 h-[584px] w-[686px]"
          height="584"
          src="/images/left-side-planet.svg"
          width="686"
        />
        <Star className="absolute left-40 top-[85%]" height={41} width={41} />
      </div>

      <div className="relative m-auto -mt-44 mb-32  flex  w-[899px] flex-col items-center justify-center gap-8 p-6 text-center font-IBM text-black  ">
        <ColoredGrid className="absolute -top-0 h-[790px] w-[1155px] text-white" />
        <Image
          alt="Galaxy"
          className="relative"
          height="272"
          src="/images/happy-sun.svg"
          width="290"
        />
        <Star className="absolute right-16    top-28" />
        <h2 className="relative w-[899px] text-[44px] font-bold">
          Empowering BadgeHolders
        </h2>
        <p className="relative text-center text-[24px]">
          Welcome to Pairwise, your go-to platform for curating project lists
          for RetroPGF 3! Immerse yourself in a streamlined experience, tailored
          to empower you, the badgeholder, in creating a meaningful impact.
          Start shaping your influence in the Optimism ecosystem and have fun
          doing it!
        </p>
        <a
          href="https://community.optimism.io/docs/governance/retropgf-3/"
          rel="noreferrer"
          target="_blank">
          <button className="relative flex h-12 shrink-0 items-center rounded-[100px] bg-black px-10 text-white">
            Learn more
            <ArrowDown className="ml-2" />
          </button>
        </a>
        <Star className="absolute -bottom-20 -left-28" height={35} width={35} />
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
          Beginning Your Journey
        </h2>
        <VectorHorizontal className="mx-auto" />
        <div className="my-6 -ml-36 flex w-[494px] flex-col gap-6 rounded-[32px] border border-white px-11 pb-14 pt-24 text-center text-black">
          <h3 className="text-[32px] font-bold">Simplifying Project Review</h3>
          <p className="text-lg font-medium">
            Crafted for RPGF, Pairwise transforms the overwhelming task of
            reviewing numerous projects into a manageable and focused activity.
            Concentrate on the projects you know best, and contribute to a more
            informed and balanced allocation of funds.
          </p>
        </div>
        <VectorHorizontal2 className="mx-auto" />
        <div className="my-6 -mr-32 ml-auto flex w-[494px] flex-col gap-6 rounded-[32px] border border-white px-11 pb-14 pt-24 text-center text-black">
          <h3 className="text-[32px] font-bold">Streamlining List Creation</h3>
          <p className="text-lg font-medium">
            With Pairwise, you can easily create, edit, and share curated lists
            of projects, to be imported directly into Agora and Supermodular for
            final voting. By progressing through planets and moons, the process
            of list-making is engaging and fun!
          </p>
          <CollectionsLeft className="absolute -left-[350px] -mt-[300px]" />
        </div>
        <VectorHorizontal3 className="mx-auto" />
        <div className="my-6 -ml-36 flex w-[494px] flex-col gap-6 rounded-[32px] border border-white px-11 pb-14 pt-24 text-center text-black">
          <h3 className="text-[32px] font-bold">Leveraging Your Expertise</h3>
          <p className="text-lg font-medium">
            Pairwise streamlines the review process, guiding you to the
            categories and projects that align with your expertise. Your
            insights are crucial; they ensure that funds are distributed to
            projects that truly make an impact in the Optimism ecosystem.
          </p>
          <CollectionsRight className="absolute -right-[320px] -mt-[40%]" />
        </div>
        <VectorHorizontal4 className="ml-28 mr-auto" />
        <div className="my-6 -mr-32 ml-auto  flex w-[494px] flex-col gap-6 rounded-[32px] border border-white px-11 pb-14 pt-24 text-center text-black">
          <h3 className="text-[32px] font-bold">Fostering Collective Impact</h3>
          <p className="text-lg font-medium">
            Pairwise is more than just a tool; it’s a community of informed
            badge holders shaping the outcomes and future of RetroPGF. Join us
            in making a lasting impact, guaranteeing that projects with proven
            impact and value receive the recognition and resources they deserve.
          </p>
          <Votes className="absolute -left-[300px] -mt-[98px]" />
        </div>
      </div>

      <div className="relative mx-auto mb-60 mt-[340px] flex w-[662px] flex-col items-center justify-center gap-10 text-center">
        <Star className="absolute -top-40    right-0" height={35} width={35} />
        <h2 className="text-5xl font-bold text-red">
          Ready to Shape the Galaxy?
        </h2>
        <p className="text-[32px]  font-medium text-black">
          Kickstart Your Journey: Connect Your Wallet Now
        </p>
        <ConnectWalletButton
          alternativeText="Start"
          className="flex h-12 items-center bg-black"
        />
        <Star
          className="absolute -bottom-20    -left-20"
          height={35}
          width={35}
        />
      </div>
      <footer className="flex w-full justify-between px-20 py-8">
        <div className="flex gap-6">
          <Twitter />
          <Linkedin />
          <Github />
          <Discord />
          <Medium />
        </div>
        <div className="flex items-center gap-2 font-Inter text-lg text-black">
          Magically crafted by <GMIcon />
        </div>
      </footer>
    </div>
  )
}

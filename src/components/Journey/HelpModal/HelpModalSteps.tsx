import { ArrowBackward } from '@/components/Icon/ArrowBackward'
import { ArrowForward } from '@/components/Icon/ArrowForward'

interface Props {
  onNext: () => void
}

interface StepTwoProps extends Props {
  onPrevious: () => void
}

export const HelpModalStepOne: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="flex flex-col justify-center gap-12 font-IBM">
      <p className="self-start text-2xl font-bold"> Unlock, Engage, Impact </p>
      <div className="flex justify-between">
        <p className="max-w-[55%] text-xl font-semibold">
          {`We've curated two exclusive collections for you to unlock, tailored to your expertise and OP allocation.
          This personalized approach ensures a more targeted and effective voting experience right from the beginning.`}
        </p>
        <img
          alt="start voting"
          className="mt-[-35px] self-start"
          src="/images/help-one-start-voting.png"
        />
      </div>
      <button
        className="flex h-[50px] items-center justify-center self-end rounded-full border border-black bg-black p-2 px-8 text-sm text-white"
        onClick={onNext}>
        {'Next'} <ArrowForward className="ml-1" />
      </button>
    </div>
  )
}

export const HelpModalStepTwo: React.FC<StepTwoProps> = ({
  onNext,
  onPrevious,
}) => {
  return (
    <div className="flex flex-col justify-center gap-12 font-IBM">
      <p className="self-start text-2xl font-bold"> Vote, Unlock, Repeat </p>
      <div className="flex justify-between">
        <p className="max-w-[55%] text-xl font-semibold">
          {`By engaging with your initial collections, you have the ability to unlock additional ones.
           Each ranked planet opens up new possibilities, allowing you to explore further areas tailored to your expertise.`}
        </p>
        <img
          alt="ethers"
          className="mt-[-35px] self-start"
          src="/images/help-two-ethers.png"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="flex h-[50px] items-center justify-center rounded-full text-sm"
          onClick={onPrevious}>
          <ArrowBackward className="mr-4" /> {'Previous'}
        </button>
        <button
          className="flex h-[50px] items-center justify-center rounded-full border border-black bg-black p-2 px-8 text-sm text-white"
          onClick={onNext}>
          {'Next'} <ArrowForward className="ml-1" />
        </button>
      </div>
    </div>
  )
}

export const HelpModalStepThree: React.FC<StepTwoProps> = ({
  onNext,
  onPrevious,
}) => {
  return (
    <div className="flex flex-col justify-center gap-12 font-IBM">
      <p className="self-start text-2xl font-bold"> Discover your impact </p>
      <div className="flex justify-between">
        <p className="max-w-[55%] text-xl font-semibold">
        Navigate to the &apos;Check Votes&apos; section now! View all the allocations you have made to each area and get ready to attest your allocations!
        </p>
        <img
          alt="ethers"
          className="self-start"
          src="/images/help-three-check-votes.png"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="flex h-[50px] items-center justify-center rounded-full text-sm"
          onClick={onPrevious}>
          <ArrowBackward className="mr-4" /> {'Previous'}
        </button>
        <button
          className="flex h-[50px] items-center justify-center rounded-full border border-black bg-black p-2 px-8 text-sm text-white"
          onClick={onNext}>
          {`Understood, Let's Go!`} <ArrowForward className="ml-1" />
        </button>
      </div>
    </div>
  )
}

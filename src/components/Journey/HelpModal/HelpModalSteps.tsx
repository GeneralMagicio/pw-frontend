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
          {`We're setting the stage with two unlocked collections just for you.
          Your expertise and strategic impact steer this selection, making your
          voting experience laser-focused from the start.`}
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
          {`Engage with your unlocked collections and wield the power to unlock even more.
            Each vote is a spell that reveals new horizons, tailored to your expertise and strategic flair.`}
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
          Ready to see your impact? Sail to the &quot;Check Votes&quot; realm. <br/> There,
          you&apos;ll unveil the tapestry of your influence, revealing how your
          expertise and strategy shape the content you explore.
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
          {'Ok, got it'} <ArrowForward className="ml-1" />
        </button>
      </div>
    </div>
  )
}

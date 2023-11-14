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
      <p className="self-start text-2xl font-bold">
        Efficient Allocation - Simplified
      </p>
      <div className="flex justify-between">
        <p className="max-w-[55%] text-xl font-semibold">
          Your category allocations of OP are initially set by the number of
          projects in each area. You can edit category allocations at any time
          by clicking the Ranking button. You can start ranking right away!
        </p>
        <img
          alt="start voting"
          className="mt-[-35px] self-start"
          src="/images/unlocked-planets.svg"
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
      <p className="self-start text-2xl font-bold"> Rank, Explore, Repeat </p>
      <div className="flex justify-between">
        <p className="max-w-[55%] text-xl font-semibold">
          Jump straight into ranking projects where you have expertise. Your
          initial category allocations can be edited anytime before submitting
          your list. The more projects you rank, the more fine-tuned the project
          allocations. Leverage your expertise to shape impact in the Optimism
          ecosystem!
        </p>
        <img
          alt="ethers"
          className="mt-[-35px] self-start"
          src="/images/begin-ranking.svg"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="flex h-[50px] items-center justify-center rounded-full border border-black p-2 px-8 text-sm"
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
      <p className="self-start text-2xl font-bold">
        {' '}
        Adjust and Submit your List
      </p>
      <div className="flex justify-between">
        <p className="max-w-[55%] text-xl font-semibold">
          {`When you are satisfied with your rankings on one planet, you can move
          onto the next! You can make any manual adjustments you would like in
          the "Ranking" section. This is where you can finalize your list and
          submit to Agora and West for voting.`}
        </p>
        <img
          alt="ethers"
          className="w-[250px] self-start"
          src="/images/ranking-image.png"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="flex h-[50px] items-center justify-center rounded-full border border-black p-2 px-8 text-sm"
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

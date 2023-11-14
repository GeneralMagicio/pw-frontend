import Button from '@/components/Button'
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

      <Button
        className="self-end"
        varient="brand"
        size="large"
        onClick={onNext}>
        {'Next'} <ArrowForward />
      </Button>
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
        <Button varient="secondary" size="large" onClick={onPrevious}>
          <ArrowBackward /> {'Previous'}
        </Button>

        <Button varient="brand" size="large" onClick={onNext}>
          {'Next'} <ArrowForward />
        </Button>
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
        <Button varient="secondary" size="large" onClick={onPrevious}>
          <ArrowBackward /> {'Previous'}
        </Button>
        <Button varient="brand" size="large" onClick={onNext}>
          {`Understood, Let's Go!`} <ArrowForward />
        </Button>
      </div>
    </div>
  )
}

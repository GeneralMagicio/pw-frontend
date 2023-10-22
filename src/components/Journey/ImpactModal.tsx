import router from 'next/router'
import { ArrowForward } from '../Icon/ArrowForward'
import Modal from '../Modal/Modal'
import { useState } from 'react'
import { DotStepper } from './DotStepper'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const StepOne: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="flex max-w-xl flex-col gap-8 p-2 font-IBM text-black">
      <h3 className="text-2xl font-bold">Allocate Your Influence</h3>
      <div className="flex flex-col gap-6 text-lg leading-8">
        <p>
          Having signaled your areas of expertise, it&apos;s time to
          strategically allocate your influence where it will bring the most
          value to the Optimism ecosystem
        </p>
        <p>
          This step ensures that your allocations are effectively aligned with
          the subjects that matter most to you and the community.
        </p>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <button
          className="flex h-[50px] items-center justify-center rounded-full border border-black bg-black p-2 px-8 text-sm text-white"
          onClick={onClick}>
          {'Got it'} <ArrowForward className="ml-1" />
        </button>
      </div>
    </div>
  )
}

const StepTwo: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="flex max-w-xl flex-col gap-8 p-2 font-IBM text-black">
      <h3 className="text-2xl font-bold">Question</h3>
      <div className="flex flex-col gap-6 text-lg font-bold leading-8">
        <p>
          Which areas do you believe will bring the most value to the Optimism
          ecosystem?
        </p>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <button
          className="flex h-[50px] items-center justify-center rounded-full border border-black bg-black p-2 px-8 text-sm text-white"
          onClick={onClick}>
          {"Start"} <ArrowForward className="ml-1" />
        </button>
      </div>
    </div>
  )
}

export const ImpactModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1)

  const goToStepTwo = () => setStep(2)

  // const changeStep = (step: number) => setStep(step)

  return (
    <Modal className="mb-8 bg-white" isOpen={isOpen} onClose={onClose}>
      <>
        {/* <div className="mb-8 ml-auto w-fit">
          <DotStepper activeStep={step} changeStep={changeStep} steps={2} />
        </div> */}
        {step === 1 ? (
          <StepOne onClick={goToStepTwo} />
        ) : (
          <StepTwo onClick={onClose} />
        )}
      </>
    </Modal>
  )
}

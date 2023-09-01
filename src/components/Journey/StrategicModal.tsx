import router from 'next/router'
import { ArrowForward } from '../Icon/ArrowForward'
import Modal from '../Modal/Modal'
import { useState } from 'react'
import { DotStepper } from './DotStepper'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const StepOne:React.FC<{onClick: () => void}> = ({onClick}) => {
  return (
    <div className="flex max-w-xl flex-col gap-8 p-2 font-IBM text-black">
      <h3 className="text-3xl font-bold">Tailor Your Path</h3>
      <div className="flex flex-col gap-6 text-lg leading-8">
        <p>
          Your expertise insights have set the stage. Now, let&apos;s explore
          your strategic preferences.
        </p>
        <p>
          This will ensure your votes align with subjects that matter most to
          you.
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

const StepTwo = () => {
  return (
    <div className="flex max-w-xl flex-col gap-8 p-2 font-IBM text-black">
      <h3 className="text-3xl font-bold">Question</h3>
      <div className="flex flex-col gap-6 text-lg leading-8">
        <p>
          Which area do you think bring more value to the Optimism DAO?
        </p>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <button
          className="flex h-[50px] items-center justify-center rounded-full border border-black bg-black p-2 px-8 text-sm text-white"
          onClick={() => {
            router.push('/start-journey')
          }}>
          {"let's start"} <ArrowForward className="ml-1" />
        </button>
      </div>
    </div>
  )
}

export const StrategicModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1)

  const goToStepTwo = () => setStep(2)

  const changeStep = (step: number) => setStep(step) 

  return (
    <Modal className="mb-80 bg-white" isOpen={isOpen} onClose={onClose}>
      <>
        <div className="mb-8">
          <DotStepper activeStep={step} changeStep={changeStep} steps={2} />
        </div>
        {step === 1 ? <StepOne onClick={goToStepTwo}/> : <StepTwo/>}
      </>
    </Modal>
  )
}

import router from 'next/router'
import { useState } from 'react'
import { HelpModalStepOne, HelpModalStepThree, HelpModalStepTwo } from './HelpModalSteps'
import Modal from '@/components/Modal/Modal'
import { DotStepper } from '../DotStepper'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const HelpModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1)

  const goToStep = (step: number) => () => setStep(step)

  const changeStep = (step: number) => setStep(step) 

  return (
    <Modal className="relative bg-white/[.9] py-8" isOpen={isOpen} onClose={onClose}>
      <>
        {/* Rewrite without absolute */ }
        <div className="absolute right-8 top-10 w-fit">
          <DotStepper activeStep={step} changeStep={changeStep} steps={3} />
        </div>
        <div className='max-h-[550px] max-w-[800px]'>
          {step === 1 && <HelpModalStepOne onNext={goToStep(2)}/>}
          {step === 2 && <HelpModalStepTwo onNext={goToStep(3)} onPrevious={goToStep(1)}/>}
          {step === 3 && <HelpModalStepThree onNext={onClose} onPrevious={goToStep(2)}/>}
        </div>
      </>
    </Modal>
  )
}

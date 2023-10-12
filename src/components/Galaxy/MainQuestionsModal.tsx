import router from "next/router"
import { ArrowForward } from "../Icon/ArrowForward"
import Modal from "../Modal/Modal"
import { useState } from "react";
import { ArrowBackward } from "../Icon/ArrowBackward";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MainQuestionsModal: React.FC<Props> = ({isOpen, onClose}) => {

  const [step, setStep] = useState<0 | 1>(0)



  return (
      <Modal backdrop={false} className="mt-48 bg-white" isOpen={isOpen} onClose={onClose}>
        {step === 0 ? <div className="flex max-w-lg flex-col gap-4 font-IBM text-black">
          <p className="text-lg font-bold">Starting the journey!</p>
          <p className="text-xl">
          Answer two brief queries to fuel your personalized voting adventure. Ready to launch?
          </p>
          <div className='mt-4 flex items-center justify-between'>
            <button
              className="flex h-[50px] items-center justify-center rounded-full border border-black bg-black p-2 px-8 text-sm font-medium text-white"
              onClick={() => setStep(1)}>
              {"Guide me through!"}
            </button>
            <button
              className="flex h-[50px] items-center justify-center rounded-full border border-black bg-black p-2 px-8 text-sm text-white"
              onClick={() => {
                router.push('/poll/expertise')
              }}>
              {"Go!"} <ArrowForward className="ml-1" />
            </button>
          </div>
        </div> : (
          <div className="flex max-w-lg flex-col gap-4 font-IBM text-black">
          <p className="flex items-center gap-4 text-lg font-bold"> <ArrowBackward className="cursor-pointer" onClick={() => setStep(0)}/> How it works</p>
          <p className="text-xl">
          First, we&apos;ll gauge your expertise and preferences for budget allocation in various areas like Core Development,
           Governance, UX, and more. Once you&apos;ve set your allocations and signaled your expertise,
           you&apos;ll begin curating projects in your areas of strength, ensuring your contributions have the most impact.
          </p>
          <p className="text-xl">
           For any areas you choose not to vote in, rest assured:
           the budget you&apos;ve allocated will be distributed based on the average choices of other citizens who voted in that specific domain.
           Dive in and make a difference!
          </p>
          <div className='mt-4 flex items-center justify-center'>
            <button
              className="flex h-[50px] items-center justify-center rounded-full border border-black bg-black p-2 px-8 text-sm text-white"
              onClick={() => {
                router.push('/poll/expertise')
              }}>
              {"Go!"} <ArrowForward className="ml-1" />
            </button>
          </div>
        </div>
        )}
      </Modal>
  )
}
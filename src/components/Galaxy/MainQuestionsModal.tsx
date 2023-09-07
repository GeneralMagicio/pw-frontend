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
            Just two simple question to create more personalized voting
            experience for you.
          </p>
          <div className='mt-4 flex items-center justify-between'>
            <p className='cursor-pointer text-sm font-medium' onClick={() => setStep(1)}> Why should I do this? </p>
            <button
              className="flex h-[50px] items-center justify-center rounded-full border border-black bg-black p-2 px-8 text-sm text-white"
              onClick={() => {
                router.push('/poll/expertise')
              }}>
              {"Let's start"} <ArrowForward className="ml-1" />
            </button>
          </div>
        </div> : (
          <div className="flex max-w-lg flex-col gap-4 font-IBM text-black">
          <p className="flex items-center gap-4 text-lg font-bold"> <ArrowBackward className="cursor-pointer" onClick={() => setStep(0)}/> Why should I do this?</p>
          <p className="text-xl">
            We believe in tailoring your experience to match your expertise and preferences.
          </p>
          <p className="text-xl">
            By answering these two questions, you will help us understand your strengths and strategic inclinations.
            This way, we can present you with content and voting options that resonate with your background, making your contribution more impactful and relevant.
          </p>
          <div className='mt-4 flex items-center justify-center'>
            <button
              className="flex h-[50px] items-center justify-center rounded-full border border-black bg-black p-2 px-8 text-sm text-white"
              onClick={() => {
                router.push('/poll/expertise')
              }}>
              {"Let's start"} <ArrowForward className="ml-1" />
            </button>
          </div>
        </div>
        )}
      </Modal>
  )
}
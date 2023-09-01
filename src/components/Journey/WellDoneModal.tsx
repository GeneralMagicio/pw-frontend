import router from 'next/router'
import { ArrowForward } from '../Icon/ArrowForward'
import Modal from '../Modal/Modal'
import { useState } from 'react'
import { ArrowBackward } from '../Icon/ArrowBackward'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const WellDoneModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal className="mb-80 bg-white" isOpen={isOpen} onClose={onClose}>
      <div className="flex max-w-xl flex-col gap-8 p-2 font-IBM text-black">
        <h3 className="text-3xl font-bold">Well done</h3>
        <p className="text-xl font-bold leading-10">
          You have taken the first step towards a personalized voting
          experience. <br/> Thank you for sharing your knowledge!
        </p>
        <div className="mt-4 flex items-center justify-center">
          <button
            className="flex h-[50px] items-center justify-center rounded-full border border-black bg-black p-2 px-8 text-sm text-white"
            onClick={() => {
              router.push('/start-journey')
            }}>
            {'Dive into Strategy'} <ArrowForward className="ml-1" />
          </button>
        </div>
      </div>
    </Modal>
  )
}

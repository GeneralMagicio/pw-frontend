import { FC } from "react"
import Modal from "../Modal/Modal"
import Lottie from "lottie-react"
import loadingAnimation from './loading.json'

interface Props {
  isOpen: boolean,
  onClose: () => void,
}

export const CustomizeExperienceModal: FC<Props> = ({isOpen, onClose}) => {
  
  return (
    <Modal backdrop={false} className="mb-60 bg-white/[.8]" isOpen={isOpen} onClose={onClose}>
      <div className="relative mt-16 flex h-[375px] flex-col items-center gap-16 px-2 font-IBM">
        <h3 className="text-2xl font-bold"> Customizing Your Experience... </h3>
        <p className="text-center text-xl font-semibold">
          Please wait as we tailor your experience to match your expertise and
          preferences.
        </p>
        <Lottie animationData={loadingAnimation} loop={true} style={{position: "absolute", width:"450px", top: "40px"}} />
      </div>
    </Modal>
  )
}

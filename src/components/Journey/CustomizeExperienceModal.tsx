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
    <Modal backdrop={false} className="mb-80 bg-white/[.8]" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center gap-16 py-12 px-2 font-IBM">
        <h3 className="text-3xl font-bold"> Customizing Your Experience... </h3>
        <p className="text-center text-xl font-semibold">
          Please wait as we tailor your experience to match your expertise and
          preferences.
        </p>
        <Lottie animationData={loadingAnimation} loop={true} style={{width: "300px", height: "250px", marginTop: "-50px"}} />
      </div>
    </Modal>
  )
}

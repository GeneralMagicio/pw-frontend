import Lottie from 'lottie-react'
import loadingAnimation from './loadingAnimation.json'

export function LoadingSpinner() {
  return (
    <Lottie
      animationData={loadingAnimation}
      loop={true}
      style={{ width: '450px' }}
    />
  )
}

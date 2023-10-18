import { useState, useEffect } from 'react'

const useCountdown = (
  initialCount: number,
  interval: number = 1000
): [number, () => void] => {
  const [count, setCount] = useState<number>(initialCount)

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCount((prevCount) => prevCount - 1)
    }, interval)

    // Clear the interval when the component is unmounted or when the countdown reaches 0
    if (count <= 0) {
      clearInterval(countdownInterval)
    }

    return () => clearInterval(countdownInterval)
  }, [count, interval])

  // Reset the countdown to the initial value
  const reset = () => {
    setCount(initialCount)
  }

  // Return the current count and the reset function
  return [count, reset]
}

export default useCountdown

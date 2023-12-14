import { useEffect, useState } from 'react'
import { ArrowForward } from '@/components/Icon/ArrowForward'
import Button from '@/components/Button'

interface QuestionProps {
  question: string
  onStart: () => void
}

export const Question: React.FC<QuestionProps> = ({ question, onStart }) => {
  const [seconds, setSeconds] = useState(3)
  const isStarted = seconds === 0
  useEffect(() => {
    if (isStarted) return
    const id = setInterval(() => setSeconds(seconds - 1), 1000)
    return () => clearInterval(id)
  }, [onStart, seconds, isStarted])
  return (
    <div className="flex max-w-lg flex-col gap-10 font-IBM text-black">
      <p className="text-center text-lg font-medium">{question}</p>
      <Button
        className="min-w-fit mx-auto"
        varient="secondary"
        size="large"
        onClick={onStart}>
        {isStarted ? (
          <>
            {"Let's start"} <ArrowForward className="ml-1" />
          </>
        ) : (
          `Start in ${seconds}`
        )}
      </Button>
    </div>
  )
}

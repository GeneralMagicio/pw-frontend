import { useEffect, useState } from 'react'
import { ArrowForward } from '@/components/Icon/ArrowForward'

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
      <button
        className={`mx-auto flex h-[50px] min-w-fit items-center justify-center rounded-full border border-dark p-2 px-8 text-sm ${
          isStarted ? 'border-black bg-black text-white' : ''
        } `}
        onClick={onStart}>
        {isStarted ? (
          <>
            {"Let's start"} <ArrowForward className="ml-1" />
          </>
        ) : (
          `Start in ${seconds}`
        )}
      </button>
    </div>
  )
}

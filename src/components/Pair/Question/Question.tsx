import { useEffect, useState } from 'react'
import { ArrowForward } from '@/components/Icon/ArrowForward'

interface QuestionProps {
  title: string
  question: string
  onStart: () => void
}

export const Question: React.FC<QuestionProps> = ({
  title,
  question,
  onStart,
}) => {
  const [seconds, setSeconds] = useState(5)
  const isStarted = seconds === 0
  useEffect(() => {
    if (isStarted) return
    const id = setInterval(() => setSeconds(seconds - 1), 1000)
    return () => clearInterval(id)
  }, [onStart, seconds, isStarted])
  return (
    <div className="flex max-w-lg flex-col gap-10 text-black ">
      <h2>{title}</h2>
      <p className="text-center">{question}</p>
      <button
        className={`mx-auto flex min-w-fit items-center justify-center rounded-full border border-dark p-2 px-8 ${
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

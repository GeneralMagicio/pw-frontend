import { ArrowBackward } from '@/components/Icon/ArrowBackward'
import { ArrowForward } from '../../../Icon/ArrowForward'
/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import { Lock } from '@/components/Icon/Lock'
import { Unlocked } from '@/components/Icon/Unlocked'
import cn from 'classnames'
import styles from './Header.module.scss'
import { useRouter } from 'next/router'

interface HeaderProps {
  question: string
  handleFinishVoting: () => void
  total: number
  threshold: number
  name: string
  voted?: number
  canFinish?: boolean
}

export const Header: React.FC<HeaderProps> = ({
  question,
  handleFinishVoting,
  total = 0,
  voted = 0,
  canFinish,
  threshold,
  name,
}) => {
  const router = useRouter()
  const progressPercentage = total ? Math.max((voted / total) * 100, 4) : 4
  const minVotesToUnlock = Math.ceil(total * threshold)
  const voteCountsToUnklock = minVotesToUnlock - voted

  return (
    <div
      className={cn(
        styles.Header,
        'relative z-30  flex h-[93px] items-center justify-between gap-4 px-20 text-lg font-semibold text-black'
      )}>
      <div className="flex justify-start w-44">
        <button
          className={cn(
            'flex items-center gap-2 whitespace-nowrap rounded-xl border-6 border-gray-30 bg-gray-50 px-6 py-2 text-lg'
          )}
          onClick={() => router.back()}>
          <ArrowBackward />
          Back
        </button>
      </div>
      <p className="max-w-xl text-xl font-bold text-center">{question}</p>
      <div className="flex justify-end w-44">
        <button
          className={cn(
            'group relative flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl border-6 border-gray-30 bg-gray-50 px-6 py-2 text-lg disabled:text-gray-400 group-hover:flex'
          )}
          disabled={!canFinish}
          onClick={handleFinishVoting}>
          Continue
          <span className="relative">
            {canFinish ? (
              <ArrowForward />
            ) : (
              <>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red text-center font-IBM text-[8px] text-white">
                  {voteCountsToUnklock}
                </span>
                <Lock />
              </>
            )}
          </span>
          {!canFinish && (
            <div className="absolute -bottom-[230%] left-0 top-16 hidden w-[350px] -translate-x-1/2 whitespace-pre-wrap rounded-2xl bg-gray-90 p-2 text-[14px]  leading-6 text-black backdrop-blur-sm group-hover:block">
              To wrap up your <span className="font-bold">{`${name} `}</span>
              ranking, you need to make at least{' '}
              <span className="font-bold">{minVotesToUnlock}</span> Pairwise
              votes.
            </div>
          )}
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-white"></div>
      <div
        className="absolute bottom-0 left-0 h-1 transition-all bg-red"
        style={{
          width: `${progressPercentage}%`,
        }}></div>

      <div
        className="absolute top-[90%] min-w-max -translate-x-1/2 translate-y-full rounded-2xl bg-white px-3 py-1 text-xs transition-all"
        style={{
          left: `${Math.min(progressPercentage, 96)}%`,
        }}>
        <span className="text-red">{voted}</span> of {total}
        <div className="absolute inset-x-0 top-0 w-0 h-0 mx-auto -translate-y-full border-b-8 border-x-8 border-x-transparent border-b-white"></div>
      </div>
    </div>
  )
}

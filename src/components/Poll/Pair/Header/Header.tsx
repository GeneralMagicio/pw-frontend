/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import { Lock } from '@/components/Icon/Lock'
import styles from './Header.module.scss'
import cn from 'classnames'
import { Unlocked } from '@/components/Icon/Unlocked'
import { useRouter } from 'next/router'
import { ArrowBackward } from '@/components/Icon/ArrowBackward'

interface HeaderProps {
  question: string
  handleFinishVoting: () => void
  total?: number
  voted?: number
  canFinish?: boolean
  threshold?: number
  collectionTitle: string
}

export const Header: React.FC<HeaderProps> = ({
  question,
  handleFinishVoting,
  total = 0,
  voted = 0,
  canFinish,
  threshold,
  collectionTitle,
}) => {
  const router = useRouter()
  const progressPercentage = total ? Math.max((voted / total) * 100, 4) : 4
  const voteCountsToUnklock = total && threshold ? total * threshold - voted : 0

  return (
    <div
      className={cn(
        styles.Header,
        'relative flex  z-50 text-lg font-semibold gap-4 justify-between text-black items-center px-48 h-[93px]'
      )}>
      <button
        className={cn(
          'flex items-center gap-2  whitespace-nowrap rounded-xl border-6 border-gray-30 bg-gray-50 px-6 py-2 text-lg'
        )}
        onClick={() => router.back()}>
        <ArrowBackward />
        Back
      </button>
      <p className="max-w-xl text-center">{question}</p>
      <button
        className={cn(
          { 'opacity-70': !canFinish },
          ' relative  flex items-center justify-center gap-2 group  whitespace-nowrap rounded-xl border-6 border-gray-30 bg-gray-50 px-6 py-2 text-lg group-hover:flex'
        )}
        // disabled={!canFinish}
        onClick={handleFinishVoting}>
        Finish voting
        <span className="relative">
          {canFinish ? (
            <Unlocked />
          ) : (
            <>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4  items-center justify-center rounded-full bg-red text-center font-IBM text-[8px] text-white">
                {voteCountsToUnklock}
              </span>
              <Lock />
            </>
          )}
        </span>
        {!canFinish && (
          <div className="absolute -bottom-[230%] left-1/2 hidden  w-[350px] -translate-x-1/2 whitespace-pre-wrap rounded-2xl  bg-gray-90 p-6 py-4 font-Inter text-base backdrop-blur-sm group-hover:block">
            You should do{' '}
            <span className="font-bold">{voteCountsToUnklock}</span> pairwise
            vote to be able to finish voting on{' '}
            <span className="font-bold">{`${collectionTitle}.`}</span>
            <div className="absolute inset-x-0 top-0 mx-auto h-0 w-0  -translate-y-full border-x-8 border-b-8 border-x-transparent border-b-white"></div>
          </div>
        )}
      </button>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-white"></div>
      <div
        className="absolute bottom-0 left-0 h-1 bg-red transition-all"
        style={{
          width: `${progressPercentage}%`,
        }}></div>

      <div
        className="absolute top-[90%] min-w-max -translate-x-1/2 translate-y-full rounded-2xl bg-white px-3 py-1 text-xs transition-all"
        style={{
          left: `${Math.min(progressPercentage, 96)}%`,
        }}>
        <span className="text-red">{voted}</span> of {total}
        <div className="absolute inset-x-0 top-0 mx-auto h-0 w-0 -translate-y-full border-x-8 border-b-8 border-x-transparent border-b-white"></div>
      </div>
    </div>
  )
}

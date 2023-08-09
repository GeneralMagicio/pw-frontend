import { Lock } from '@/components/Icon/Lock'
import styles from './Header.module.scss'
import cn from 'classnames'

interface HeaderProps {
  question: string
  handleFinishVoting: () => void
  total?: number
  voted?: number
}

export const Header: React.FC<HeaderProps> = ({
  question,
  handleFinishVoting,
  total = 0,
  voted = 0,
}) => {
  const progressPercentage = total ? (voted / total) * 100 : 0
  return (
    <div
      className={cn(
        styles.Header,
        'relative flex  text-lg font-semibold gap-4 justify-between text-black items-center px-48 h-[93px]'
      )}>
      <p>{question}</p>
      <button
        className="flex items-center gap-2  whitespace-nowrap rounded-xl border-6 border-gray-30 bg-gray-50 px-6 py-2 text-lg"
        onClick={handleFinishVoting}>
        Finish voting
        <Lock />
      </button>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-white"></div>
      <div
        className="absolute bottom-0 left-0 h-1 bg-red transition-all"
        style={{
          width: `${progressPercentage}%`,
        }}></div>
      {Boolean(total && progressPercentage >= 3) && (
        <div
          className="absolute top-[90%] min-w-max -translate-x-1/2 translate-y-full rounded-2xl bg-white px-3 py-1 text-xs transition-all"
          style={{
            left: `${Math.min(progressPercentage, 96)}%`,
          }}>
          <span className="text-red">{voted}</span> of 87
          <div className="absolute top-0 h-0 w-0 -translate-y-full translate-x-5 border-x-8 border-b-8 border-x-transparent border-b-white"></div>
        </div>
      )}
    </div>
  )
}

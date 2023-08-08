import { Lock } from '@/components/Icon/Lock'
import styles from './Footer.module.scss'
import cn from 'classnames'
import { ArrowBackward } from '@/components/Icon/ArrowBackward'

interface FooterProps {
  collectionName: string
  onBack: () => void
}

export const Footer: React.FC<FooterProps> = ({
  collectionName = 'Collection X',
  onBack,
}) => {
  return (
    <div
      className={cn(
        styles.Footer,
        'fixed rounded-tl-[33%] rounded-tr-[33%]   bottom-0 w-full flex text-lg justify-between text-black items-center px-48 h-[93px]'
      )}>
      <button
        className="flex items-center gap-2  rounded-xl border-4 border-gray-30 bg-gray-50 px-6 py-2 text-lg"
        onClick={onBack}>
        <ArrowBackward />
        Back
      </button>
      <span className="text-lg text-black">Voting on {collectionName}</span>
      <button
        className="flex opacity-0 items-center gap-2  rounded-xl border-4 border-gray-30 bg-gray-50 px-6 py-2 text-lg"
        onClick={onBack}>
        <ArrowBackward />
        Back
      </button>
    </div>
  )
}

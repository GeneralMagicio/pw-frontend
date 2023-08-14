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
        'fixed justify-center rounded-tl-[33%] rounded-tr-[33%]   bottom-0 w-full flex text-lg text-black items-center px-48 h-[54px]'
      )}>
      <span className="text-lg text-black">Voting on {collectionName}</span>
    </div>
  )
}

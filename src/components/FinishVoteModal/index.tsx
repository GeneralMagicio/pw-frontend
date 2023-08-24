import { Close } from '@/components/Icon/Close'
import { useRouter } from 'next/router'
import { ColoredGrid } from '../Icon/ColoredGrid'
import { SadSun } from '../Icon/SadSun'
import { PairType } from '@/types/Pairs/Pair'
import { ArrowForward } from '../Icon/ArrowForward'

interface FinishVoteModalProps {
  nextCollection: PairType
}
export const FinishVoteModal: React.FC<FinishVoteModalProps> = ({
  nextCollection,
}) => {
  const router = useRouter()
  return (
    <>
      <div className="relative flex   flex-col  gap-6 font-IBM">
        <div className="flex flex-col  justify-center gap-10">
          <header className="mb-2 flex w-full ">
            <h3 className="text-3xl font-bold">Well done</h3>
          </header>

          <p className="text-xl">
            Now {nextCollection.name} has been unlocked for voting!
          </p>
          <div className="flex items-center justify-between">
            <button
              className={
                'flex h-12 min-w-[120px] items-center rounded-full border border-black bg-white px-4 py-2  text-black'
              }
              onClick={() => router.push('/galaxy')}>
              Go to dashboard
            </button>
            <button
              className={
                'flex h-12 min-w-[120px] items-center rounded-full bg-black px-4 py-2  text-white'
              }
              onClick={() => router.push(`/poll/${nextCollection.id}`)}>
              {`Let's start`} <ArrowForward className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

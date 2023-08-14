import { useEffect, useState } from 'react'
import { PairsType, VOTES } from '@/types/Pairs'
import { PairType } from '@/types/Pairs/Pair'
import { Grid } from '@/components/Icon/Grid'
import { Pair } from '../Pair'

interface PairsProps {
  pairs: PairsType['pairs']
  onVote: (pair: PairType[], picked?: number) => Promise<PairsType['pairs']>
}
export const Pairs: React.FC<PairsProps> = ({ pairs = [], onVote }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [voted, setVoted] = useState<VOTES>(VOTES.NONE)

  useEffect(() => {
    setVoted(VOTES.NONE)
  }, [activeIndex])

  return (
    <div className="container relative mx-auto  flex min-w-[900px]  overflow-hidden px-16">
      <div className="absolute inset-0 mx-auto -mt-8  flex justify-center overflow-hidden text-black">
        <Grid />
      </div>
      <div
        className="flex w-full shrink-0 gap-7  transition-transform duration-500"
        style={{
          transform: `translateX(calc(-${
            activeIndex * 100
          }% + calc(${activeIndex} * -1.75rem)))`,
        }}>
        {pairs.map((pair, idx) => (
          <Pair
            hidden={activeIndex !== idx}
            key={idx}
            onVote={(item, newVoted) => {
              if (voted === VOTES.NONE) {
                setVoted(newVoted)
                onVote(pair, item?.id).then((newPairs) => {
                  setActiveIndex(Math.min(activeIndex + 1, newPairs.length - 1))
                })
              }
            }}
            pair={pair}
            voted={voted}
          />
        ))}
      </div>
    </div>
  )
}

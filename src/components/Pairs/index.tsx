import { useEffect, useState } from 'react'
import { Pair } from '../Pair'
import { PairsType, VOTES } from '@/types/Pairs'
import { PairType } from '@/types/Pairs/Pair'
import { Grid } from '../Icon/Grid'

interface PairsProps {
  pairs: PairsType['pairs']
  onVote: (pair: PairType[], picked?: number) => Promise<unknown>
}
export const Pairs: React.FC<PairsProps> = ({ pairs = [], onVote }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [voted, setVoted] = useState<VOTES>(VOTES.ABSTAIN)

  useEffect(() => {
    setVoted(VOTES.NONE)
  }, [activeIndex])

  return (
    <div className="relative container mx-auto flex min-w-[900px]  overflow-hidden px-16">
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
            onVote={(item, voted) => {
              setVoted(voted)
              onVote(pair, item?.id).then(() => {
                setActiveIndex(Math.min(activeIndex + 1, pairs.length - 1))
              })
            }}
            pair={pair}
            voted={voted}
          />
        ))}
      </div>
    </div>
  )
}

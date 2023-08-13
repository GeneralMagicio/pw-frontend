import { useEffect, useState } from 'react'
import { PairsType, VOTES } from '@/types/Pairs'
import { PairType } from '@/types/Pairs/Pair'
import { Grid } from '@/components/Icon/Grid'
import { Pair } from '../Pair'

interface PairsProps {
  pairs: PairsType['pairs']
  onVote: (pair: PairType[], picked?: number) => Promise<unknown>
}
export const Pairs: React.FC<PairsProps> = ({ pairs = [], onVote }) => {
  // const [activeIndex, setActiveIndex] = useState(0)
  const [voted, setVoted] = useState<VOTES>(VOTES.NONE)

  const pair = pairs[0]

  useEffect(() => {
    setVoted(VOTES.NONE)
  }, [pair])
  console.log({ voted })
  return (
    <div className="container relative mx-auto mt-4 flex min-w-[900px]  overflow-hidden px-16">
      <div className="absolute inset-0 mx-auto -mt-8  flex justify-center overflow-hidden text-black">
        <Grid />
      </div>
      <div
        className="flex w-full shrink-0 gap-7  transition-transform duration-500">
          <Pair
            // hidden={false}
            // key={idx}
            onVote={(item, newVoted) => {
              if (voted === VOTES.NONE) {
                setVoted(newVoted)
                onVote(pair, item?.id)
              }
            }}
            pair={pair}
            voted={voted}
          />
      </div>
    </div>
  )
}

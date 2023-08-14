import { useState } from 'react'
import { Abstain } from './Abstain'
import { VoteCard } from './VoteCard'
import cn from 'classnames'
import { PairType } from '@/types/Pairs/Pair'
import { VOTES } from '@/types/Pairs'

interface PairProps {
  onVote: (pair: PairType | null, voted: VOTES) => void
  hidden?: boolean
  voted: VOTES
  pair: PairType[]
}

export const Pair: React.FC<PairProps> = ({ onVote, voted, pair, hidden }) => {
  const [a, b] = pair
  const [hoverdItem, setHoverdItem] = useState<VOTES>(VOTES.NONE)
  return (
    <div
      className={cn(
        { 'opacity-0': hidden },
        'relative transition-opacity items-center z-10 mt-10 flex w-full min-w-max  max-w-screen-2xl shrink-0 justify-between gap-5'
      )}>
      <VoteCard
        item={a}
        onClick={() => onVote(a, VOTES.LEFT)}
        onMouseEnter={() => setHoverdItem(VOTES.LEFT)}
        onMouseLeave={() => setHoverdItem(VOTES.NONE)}
        placement="left"
        selected={voted === VOTES.LEFT}
        varient={
          hoverdItem === VOTES.ABSTAIN
            ? 'skew'
            : hoverdItem === VOTES.RIGHT
            ? 'fade'
            : 'normal'
        }
      />
      <Abstain
        onClick={() => onVote(null, VOTES.NONE)}
        onMouseEnter={() => setHoverdItem(VOTES.ABSTAIN)}
        onMouseLeave={() => setHoverdItem(VOTES.NONE)}
        selected={voted === VOTES.ABSTAIN}
      />
      <VoteCard
        item={b}
        onClick={() => onVote(b, VOTES.RIGHT)}
        onMouseEnter={() => setHoverdItem(VOTES.RIGHT)}
        onMouseLeave={() => setHoverdItem(VOTES.NONE)}
        placement="right"
        selected={voted === VOTES.RIGHT}
        varient={
          hoverdItem === VOTES.ABSTAIN
            ? 'skew'
            : hoverdItem === VOTES.LEFT
            ? 'fade'
            : 'normal'
        }
      />
    </div>
  )
}

import { Check } from '../../../Icon/Check'
import { CollectionProgressStatus } from '../../../Galaxy/types'
import { PairsType } from '../../../../types/Pairs'

type HeaderLabelProps = {
  pairs?: PairsType
  progress?: CollectionProgressStatus
}

export const HeaderLabels: React.FC<HeaderLabelProps> = ({
  pairs,
  progress,
}) => {
  if (progress === 'Pending') {
    return (
      <span className="flex w-fit items-center whitespace-nowrap rounded-3xl bg-gray-100 p-1 px-2 text-xs text-[#1C64F2]">
        Not ranked
      </span>
    )
  }

  if (!pairs) return null

  const progressPercentage = pairs.totalPairs
    ? Math.max((pairs.votedPairs / pairs.totalPairs) * 100, 4)
    : 4
  const minVotesToUnlock = Math.ceil(pairs.totalPairs * pairs.threshold)
  const voteCountsToUnklock = minVotesToUnlock - pairs.votedPairs

  if (progress === 'WIP') {
    if (pairs.votedPairs > voteCountsToUnklock) {
      return (
        <div className="flex gap-2">
          <span className="flex w-fit items-center whitespace-nowrap rounded-3xl bg-[#22B7A01A] p-1 px-2 text-xs text-[#22B7A0]">
            Ranked <Check className="w-3 h-3 ml-1" color="#22B7A0" />
          </span>
          <span className="flex w-fit items-center whitespace-nowrap rounded-3xl bg-[#F366001A] p-1 px-2 text-xs text-[#F36600]">
            List not created
          </span>
        </div>
      )
    }

    return (
      <span className="flex w-fit items-center whitespace-nowrap rounded-3xl bg-gray-100 p-1 px-2 text-xs text-[#1C64F2]">
        In progress {progressPercentage.toFixed(0)}%
      </span>
    )
  }

  return null
}

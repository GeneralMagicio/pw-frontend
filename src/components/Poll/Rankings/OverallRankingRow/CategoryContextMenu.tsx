import { Popover } from '@headlessui/react'
import { Dots } from '../../../Icon/Dots'
import { PairsType } from '../../../../types/Pairs'
import { CollectionProgressStatus } from '../../../Galaxy/types'
import React from 'react'
import Link from 'next/link'
import { PairType } from '../../../../types/Pairs/Pair'
import { ArrowForward } from '../../../Icon/ArrowForward'
import { Plus } from '../../../Icon/Plus'

type CategoryContextMenuProps = {
  collection?: PairType
  pairs?: PairsType
  progress?: CollectionProgressStatus
}

export const CategoryContextMenu: React.FC<CategoryContextMenuProps> = ({
  collection,
  pairs,
  progress,
}) => {
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center">
        <Dots />
      </Popover.Button>

      <Popover.Panel className="absolute z-10 w-56 p-2 bg-white rounded-lg -left-44 drop-shadow-2xl">
        <div className="flex flex-col gap-2">
          <Options collection={collection} pairs={pairs} progress={progress} />
        </div>
      </Popover.Panel>
    </Popover>
  )
}

const Options: React.FC<CategoryContextMenuProps> = ({
  collection,
  pairs,
  progress,
}) => {
  if (!pairs)
    return (
      <div className="flex flex-col gap-2">
        <BeginRankingOption collection={collection} />
        <div className="w-full h-1 border-b border-gray-200" />
        <CreateListOption collection={collection} disabled />
      </div>
    )

  const minVotesToUnlock = Math.ceil(pairs.totalPairs * pairs.threshold)
  const voteCountsToUnklock = minVotesToUnlock - pairs.votedPairs

  return (
    <div className="flex flex-col gap-2">
      {progress === 'Pending' ? (
        <BeginRankingOption collection={collection} />
      ) : (
        <ContinueRankingOption collection={collection} />
      )}
      <div className="w-full h-1 border-b border-gray-200" />
      <CreateListOption
        collection={collection}
        disabled={pairs.votedPairs < voteCountsToUnklock}
      />
    </div>
  )
}

const ContinueRankingOption: React.FC<CategoryContextMenuProps> = ({
  collection,
}) => {
  return (
    <Link href={`/poll/${collection?.id}`}>
      <div className="flex items-center justify-between w-full px-2 py-1 rounded-lg whitespace-nowrap hover:bg-gray-100">
        Continue ranking <ArrowForward className="w-5 h-5" />
      </div>
    </Link>
  )
}

const BeginRankingOption: React.FC<CategoryContextMenuProps> = ({
  collection,
}) => {
  return (
    <Link href={`/poll/${collection?.id}`}>
      <div className="flex items-center justify-between w-full px-2 py-1 rounded-lg whitespace-nowrap hover:bg-gray-100">
        Begin ranking <ArrowForward className="w-5 h-5" />
      </div>
    </Link>
  )
}

type CreateListOptionProps = {
  collection?: PairType
  disabled?: boolean
}
const CreateListOption: React.FC<CreateListOptionProps> = ({
  collection,
  disabled,
}) => {
  if (disabled) {
    return (
      <div className="flex items-center justify-between w-full px-2 py-1 text-gray-200 rounded-lg whitespace-nowrap">
        Create list <Plus className="w-5 h-5" />
      </div>
    )
  }
  return (
    <div className="flex items-center justify-between w-full px-2 py-1 rounded-lg whitespace-nowrap hover:bg-gray-100">
      Create list <Plus className="w-5 h-5" />
    </div>
  )
}

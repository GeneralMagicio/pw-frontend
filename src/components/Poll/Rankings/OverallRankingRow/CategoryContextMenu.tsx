import { ArrowForward } from '../../../Icon/ArrowForward'
import { CollectionProgressStatus } from '../../../Galaxy/types'
import { Dots } from '../../../Icon/Dots'
import { Eye } from '../../../Icon/Eye'
import Link from 'next/link'
import Modal from '@/components/Modal/Modal'
import { PairType } from '../../../../types/Pairs/Pair'
import { Plus } from '../../../Icon/Plus'
import { Popover } from '@headlessui/react'
import React from 'react'
import { VoteModal } from '../../Pair/VoteModal'

type CategoryContextMenuProps = {
  collection?: PairType
  progress: CollectionProgressStatus
  openAttestationModal?: () => void
}

export const CategoryContextMenu: React.FC<CategoryContextMenuProps> = ({
  collection,
  progress,
  openAttestationModal,
}) => {
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center">
        <Dots />
      </Popover.Button>

      <Popover.Panel className="absolute -left-48 z-10 w-56 rounded-lg bg-white p-2 drop-shadow-2xl">
        <div className="flex flex-col gap-2">
          <Options
            collection={collection}
            openAttestationModal={openAttestationModal}
            progress={progress}
          />
        </div>
      </Popover.Panel>
    </Popover>
  )
}

const Options: React.FC<CategoryContextMenuProps> = ({
  collection,
  progress,
  openAttestationModal,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {progress === 'Pending' ? (
        <BeginRankingOption collection={collection} />
      ) : progress === 'WIP' ? (
        <ContinueRankingOption
          collection={collection}
        />
      ) : null}
      {['Pending', 'WIP'].includes(progress || '') ? (
        <div className="h-1 w-full border-b border-gray-200" />
      ) : null}
      <CreateListOption
        collection={collection}
        progress={progress}
        openAttestationModal={openAttestationModal}
      />
    </div>
  )
}

const ContinueRankingOption: React.FC<
  Pick<CategoryContextMenuProps, 'collection'>
> = ({ collection }) => {
  return (
    <Link href={`/poll/${collection?.id}`}>
      <div className="flex w-full items-center justify-between whitespace-nowrap rounded-lg px-2 py-1 hover:bg-gray-100">
        Continue ranking <ArrowForward className="h-5 w-5" />
      </div>
    </Link>
  )
}

const BeginRankingOption: React.FC<
  Pick<CategoryContextMenuProps, 'collection'>
> = ({ collection }) => {
  return (
    <Link href={`/poll/${collection?.id}`}>
      <div className="flex w-full items-center justify-between whitespace-nowrap rounded-lg px-2 py-1 hover:bg-gray-100">
        Begin ranking <ArrowForward className="h-5 w-5" />
      </div>
    </Link>
  )
}

type CreateListOptionProps = {
  collection?: PairType
  openAttestationModal?: () => void
  progress: CollectionProgressStatus
}
const CreateListOption: React.FC<CreateListOptionProps> = ({
  collection,
  progress,
  openAttestationModal,
}) => {
  const title = 'Create list'
  const disabled = progress === 'Pending'
  if (disabled || !collection) {
    return (
      <div className="flex w-full items-center justify-between whitespace-nowrap rounded-lg px-2 py-1 text-gray-200">
        {title} <Plus className="h-5 w-5" />
      </div>
    )
  }
  return (
    <div
      className="flex w-full cursor-pointer items-center text-sm justify-between whitespace-nowrap rounded-lg px-2 py-1 hover:bg-gray-100"
      onClick={openAttestationModal}>
      {title} <Plus className="h-5 w-5" />
    </div>
  )
}

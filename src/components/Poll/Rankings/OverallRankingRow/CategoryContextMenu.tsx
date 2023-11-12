import { ArrowForward } from '../../../Icon/ArrowForward'
import { CollectionProgressStatus } from '../../../Galaxy/types'
import { Dots } from '../../../Icon/Dots'
import Link from 'next/link'
import { PairType } from '../../../../types/Pairs/Pair'
import { Plus } from '../../../Icon/Plus'
import { Popover } from '@headlessui/react'
import React from 'react'

type CategoryContextMenuProps = {
  collection?: PairType
  progress: CollectionProgressStatus
  openAttestationModal?: () => void
  openEditManualModal?: () => void
  isEditing: boolean
}

export const CategoryContextMenu: React.FC<CategoryContextMenuProps> = ({
  collection,
  progress,
  openAttestationModal,
  openEditManualModal,
  isEditing,
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
            openEditManualModal={openEditManualModal}
            progress={progress}
            isEditing={isEditing}
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
  openEditManualModal,
  isEditing,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {progress === 'Pending' ? (
        <BeginRankingOption collection={collection} />
      ) : progress === 'WIP' ? (
        <ContinueRankingOption collection={collection} />
      ) : progress === 'WIP - Threshold' ? (
        <ContinueRankingThresholdOption
          collection={collection}
          openEditManualModal={openEditManualModal}
        />
      ) : null}
      {['Pending', 'WIP', 'WIP - Threshold'].includes(progress || '') ? (
        <div className="h-1 w-full border-b border-gray-200" />
      ) : null}
      <CreateListOption
        collection={collection}
        progress={progress}
        openAttestationModal={openAttestationModal}
        isEditing={isEditing}
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

const ContinueRankingThresholdOption: React.FC<
  Pick<CategoryContextMenuProps, 'collection' | 'openEditManualModal'>
> = ({ collection, openEditManualModal }) => {
  const finishCategory = async () => {
    if (!collection?.id) return
    openEditManualModal?.()
  }
  return (
    <>
      <Link href={`/poll/${collection?.id}`}>
        <div className="flex w-full items-center justify-between whitespace-nowrap rounded-lg px-2 py-1 hover:bg-gray-100">
          Continue ranking <ArrowForward className="h-5 w-5" />
        </div>
      </Link>
      <div
        onClick={finishCategory}
        className="flex w-full cursor-pointer items-center justify-between whitespace-nowrap rounded-lg px-2 py-1 hover:bg-gray-100">
        Edit manually <ArrowForward className="h-5 w-5" />
      </div>
    </>
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
  isEditing: boolean
}
const CreateListOption: React.FC<CreateListOptionProps> = ({
  collection,
  progress,
  openAttestationModal,
  isEditing,
}) => {
  const title = 'Create list'
  const disabled = progress === 'Pending' || progress === 'WIP'
  if (isEditing || disabled || !collection) {
    return (
      <div
        title={'You need to first save your changes.'}
        className="flex w-full items-center justify-between whitespace-nowrap rounded-lg px-2 py-1 text-gray-200">
        {title} <Plus className="h-5 w-5" />
      </div>
    )
  }
  return (
    <div
      className="flex w-full cursor-pointer items-center justify-between whitespace-nowrap rounded-lg px-2 py-1 hover:bg-gray-100"
      onClick={openAttestationModal}>
      {title} <Plus className="h-5 w-5" />
    </div>
  )
}

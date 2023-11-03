import {
  EditingCollectionRanking,
  EditingProjectRanking,
} from '../edit-logic/edit'
import React, { useState } from 'react'

import { CaretDown } from '@/components/Icon/CaretDown'
import { CaretUp } from '@/components/Icon/CaretUp'
import { EditTextField } from '../EditTextField'
import { toFixedNumber } from '@/utils/helpers'
import { useCollapse } from 'react-collapsed'
import { PairType } from '../../../../types/Pairs/Pair'
import { HeaderLabels } from './HeaderLabels'
import { PairsType } from '../../../../types/Pairs'
import { CategoryContextMenu } from './CategoryContextMenu'
import { ProjectContextMenu } from './ProjectContextMenu'

interface RankingProps {
  data: EditingProjectRanking
  onEditChange: (value: number) => void
  onLockClick: () => void
  editMode: boolean
}

export const OverallRankingRow: React.FC<RankingProps> = ({
  data,
  onEditChange,
  onLockClick,
  editMode,
}) => {
  return (
    <div
      className={`mb-2 flex cursor-pointer items-center gap-6 rounded-lg bg-white/[.5] px-6 py-3 text-black`}>
      <span className="grow">{data.name}</span>

      <span className="flex items-center justify-end w-36">
        <span className="">
          {(toFixedNumber(data.share, 6) * 3e6).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <span className="mb-1 ml-1 align-super text-[8px] text-red">OP</span>
      </span>

      <span className="flex items-center justify-end w-44">
        <div className="flex h-[24px] items-center">
          {!editMode ? (
            <>
              <span className="mr-1 text-[8px] text-red">%</span>
              <span className="">
                {(data.share * 100).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </span>
            </>
          ) : (
            <EditTextField
              error={data.error}
              focus={false}
              locked={data.locked}
              onChange={onEditChange}
              onLockClick={onLockClick}
              value={toFixedNumber(data.share * 100, 4)}
            />
          )}
        </div>
      </span>
      <span className="flex justify-end w-20">
        <ProjectContextMenu project={data.id} />
      </span>
    </div>
  )
}

interface HeaderProps extends Omit<RankingProps, 'data'> {
  collection?: PairType
  data: EditingCollectionRanking
  children: React.ReactNode
  expanded?: boolean
  level: number
  pairs?: PairsType
}

export const OverallRankingHeader: React.FC<HeaderProps> = ({
  collection,
  data,
  children,
  onEditChange,
  onLockClick,
  editMode,
  expanded = false,
  pairs,
  level,
}) => {
  const [isExpanded, setExpanded] = useState(expanded || false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

  return (
    <div className="flex flex-col items-end w-full mb-2 text-black last:mb-0">
      <div
        className={`flex w-full items-center gap-6 rounded-lg bg-white/[.8] px-6 py-3`}>
        <span
          {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
          })}
          className="flex items-center justify-center w-12 h-6">
          {isExpanded ? <CaretUp /> : <CaretDown />}
        </span>
        <span className="grow">{data.name}</span>
        <span className="flex items-center justify-end w-36">
          <HeaderLabels pairs={pairs} progress={collection?.progress} />
        </span>
        <span className="flex items-center justify-end w-36">
          <span className="">
            {(data.share * 3e6).toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </span>
          <span className="mb-1 ml-1 align-super text-[8px] text-red">OP</span>
        </span>{' '}
        <span className="flex items-center justify-end w-44">
          <div className="flex h-[24px] items-center">
            {!editMode ? (
              <>
                <span className="mr-1 text-[8px] text-red">%</span>
                <span className="">
                  {(data.share * 100).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </span>
              </>
            ) : (
              <EditTextField
                error={data.error}
                focus={false}
                locked={data.locked}
                onChange={onEditChange}
                onLockClick={onLockClick}
                value={toFixedNumber(data.share * 100, 4)}
              />
            )}
          </div>
        </span>
        <span className="flex items-center justify-end w-20">
          {level === 2 && (
            <CategoryContextMenu
              collection={collection}
              pairs={pairs}
              progress={collection?.progress}
            />
          )}
        </span>
      </div>
      <section className={`mt-2 flex w-[97%] flex-col`} {...getCollapseProps()}>
        {children}
      </section>
    </div>
  )
}

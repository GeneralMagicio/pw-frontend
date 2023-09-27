import { CaretDown } from '@/components/Icon/CaretDown'
import { CaretUp } from '@/components/Icon/CaretUp'
import { Move } from '@/components/Icon/Move'
import React, { useState } from 'react'
import { useCollapse } from 'react-collapsed'
import { EditTextField } from '../EditTextField'
import { toFixedNumber } from '@/utils/helpers'

interface RankingProps {
  data: { id: number | string; name: string; share: number; locked: boolean, error: boolean }
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
      className={`mb-2 flex cursor-pointer items-center gap-6  rounded-lg bg-white/[.5] px-6 py-3 font-Inter text-black`}>
      <span className="grow">{data.name}</span>
      <span className="flex w-52 items-center justify-center">
        <div className="flex h-[24px] items-center">
          {!editMode ? (
            <>
              <span className="mr-1 text-[8px] text-red">%</span>
              <span className="">{(data.share * 100).toFixed(2)}</span>
            </>
          ) : (
            <EditTextField
              error={data.error}
              focus={false}
              locked={data.locked}
              onChange={onEditChange}
              onLockClick={onLockClick}
              value={toFixedNumber(data.share * 100, 3)}
            />
          )}
        </div>
      </span>
      <span className="flex w-36 items-center">
        <span className="">{(data.share * 3e6).toFixed(2)}</span>
        <span className="mb-1 ml-1 align-super text-[8px] text-red">OP</span>
      </span>
      <span className="w-12"></span>
    </div>
  )
}

interface HeaderProps extends RankingProps {
  children: React.ReactNode
}

export const OverallRankingHeader: React.FC<HeaderProps> = ({
  data,
  children,
  onEditChange,
  onLockClick,
  editMode,
}) => {
  const [isExpanded, setExpanded] = useState(false)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

  return (
    <div className="flex w-full cursor-pointer flex-col items-end font-Inter text-black">
      <div
        className={`mb-2 flex w-full items-center gap-6 rounded-lg bg-white/[.8] px-6 py-3`}>
        <span className="grow">{data.name}</span>
        <span className="flex w-52 items-center justify-center">
          <div className="flex h-[24px] items-center">
            {!editMode ? (
              <>
                <span className="mr-1 text-[8px] text-red">%</span>
                <span className="">{(data.share * 100).toFixed(2)}</span>
              </>
            ) : (
              <EditTextField
                error={data.error}
                focus={false}
                locked={data.locked}
                onChange={onEditChange}
                onLockClick={onLockClick}
                value={toFixedNumber(data.share * 100, 3)}
              />
            )}
          </div>
        </span>
        <span className="flex w-36 items-center">
          <span className="">{(data.share * 3e6).toFixed(2)}</span>
          <span className="mb-1 ml-1 align-super text-[8px] text-red">OP</span>
        </span>
        <span
          {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
          })}
          className="flex w-12 items-center">
          {isExpanded ? <CaretUp /> : <CaretDown />}
        </span>
      </div>
      <section className={`flex w-[97%] flex-col`} {...getCollapseProps()}>
        {children}
      </section>
    </div>
  )
}
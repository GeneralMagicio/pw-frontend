import { ArrowDown } from '@/components/Icon/ArrowDown';
import { Move } from '@/components/Icon/Move'
import React, { useState } from 'react'
import { useCollapse } from 'react-collapsed'

interface RankingProps {
  data: { id: number | string; name: string; share: number }
  level: number
}

export const OverallRankingRow: React.FC<RankingProps> = ({ data, level }) => {
  return (
    <div
      className={`mb-2 flex cursor-pointer items-center gap-6 rounded-xl bg-gray-40 px-6 py-3 font-Inter text-black`}>
      <Move />
      <span className="w-16">{level}</span>
      <span className="grow">{data.name}</span>
      <span className="flex w-[27%] items-center justify-center">
        <span className="mr-1 text-[8px] text-red">%</span>
        <span className="">{(data.share * 100).toFixed(2)}</span>
      </span>
      <span className="flex w-36 items-center">
        <span className="">{(data.share * 40e6).toFixed(2)}</span>
        <span className="mb-1 ml-1 align-super text-[8px] text-red">OP</span>
      </span>
    </div>
  )
}

interface HeaderProps extends RankingProps {
  // isExpanded: boolean
  // onClick: () => void
  children: React.ReactNode
}

export const OverallRankingHeader: React.FC<HeaderProps> = ({
  data,
  level,
  // isExpanded,
  children,
}) => {
  const [isExpanded, setExpanded] = useState(true)
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })

  const widthCalculator = (level: number) => {
    switch (level) {
      case 0:
        return 'w-[100%]'
      case 1:
        return 'w-[97%]'
      case 2:
        return 'w-[94%]'
      case 3:
        return 'w-[91%]'
      case 4:
        return 'w-[88%]'
      case 5:
        return 'w-[85%]'
      default:
        return 'w-[100%]'
    }
  }

  return (
    <div className="flex w-full cursor-pointer flex-col items-end font-Inter text-black">
      <div
        className={`mb-2 flex w-full items-center gap-6 rounded-xl bg-gray-40 px-6 py-3`}>
        <Move
          {...getToggleProps({
            onClick: () => setExpanded((prevExpanded) => !prevExpanded),
          })}
        />
        <span className="w-16">{level}</span>
        <span className="grow">{data.name}</span>
        <span className="flex w-[27%] items-center justify-center">
          <span className="mr-1 text-[8px] text-red">%</span>
          <span className="">{(data.share * 100).toFixed(2)}</span>
        </span>
        <span className="flex w-36 items-center">
          <span className="">{(data.share * 40e6).toFixed(2)}</span>
          <span className="mb-1 ml-1 align-super text-[8px] text-red">OP</span>
        </span>
        <span className="flex w-12 items-center">
          <ArrowDown stroke='black'/>
        </span>
      </div>
      <section
        className={`flex flex-col ${widthCalculator(level + 1)}`}
        {...getCollapseProps()}>
        {children}
      </section>
    </div>
  )
}

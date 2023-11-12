/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import React from 'react'
import styles from './VoteCard.module.scss'
import cn from 'classnames'
import { Eye } from '@/components/Icon/Eye'
import { PairType } from '@/types/Pairs/Pair'
import { CardBorderLeft } from '@/components/Icon/CardBorderLeft'
import { CardBorderRight } from '@/components/Icon/CardBorderRight'
import Image from 'next/image'

interface VoteCardProps {
  placement: 'left' | 'right'
  varient?: 'skew' | 'normal' | 'fade'
  item: PairType
  selected?: boolean
  onQuickView: () => void
}

const isSingleProject = (item: PairType) => {
  const subProjects = item.subProjects
  if (item.numOfChildren || (subProjects && subProjects.length > 0))
    return false

  return true
}

export const VoteCard: React.FC<
  VoteCardProps & React.HTMLProps<HTMLDivElement>
> = ({
  item,
  placement = 'left',
  varient = 'normal',
  selected,
  onClick,
  onQuickView,
  ...props
}) => {
  const isRight = placement === 'right'
  const isLeft = placement === 'left'
  const isSkew = varient === 'skew'

  return (
    <div className={cn(styles.voteCardWrapper, 'flex flex-col')} {...props}>
      {isRight ? (
        <CardBorderRight
          className={cn('absolute', {
            '-left-32 -scale-x-100': isRight,
            '-top-0 bottom-0 object-none': isLeft,
          })}
          height={445}
          width={83}
        />
      ) : (
        <CardBorderLeft
          className={cn('absolute -left-14 -top-0', {
            '-left-32 -scale-x-100': isRight,
            ' bottom-0 object-none': isLeft,
          })}
          height={445}
          width={18}
        />
      )}

      <div
        className={cn(
          styles.voteCard,
          styles[`voteCard--${varient}`],
          'relative h-[445px] w-[312px] cursor-pointer rounded-2xl'
        )}>
        {!selected && (
          <>
            <div
              className={cn(
                styles['voteCard__shadow'],
                'absolute inset-0 -bottom-8 opacity-50 ',
                {
                  '-right-8': isRight,
                  '-left-8': isLeft,
                },
                'rounded-2xl bg-[#FFFFFF80]  backdrop-blur-xl'
              )}></div>
            <div
              className={cn(
                styles['voteCard__shadow'],
                'absolute inset-0 -bottom-6 opacity-50 ',
                {
                  '-right-6': isRight,
                  '-left-6': isLeft,
                },
                'rounded-2xl bg-[#FFFFFF80]  backdrop-blur-xl'
              )}></div>
            <div
              className={cn(
                styles['voteCard__shadow'],
                'absolute inset-0 -bottom-4 opacity-70',
                { '-right-4': isRight, '-left-4': isLeft },
                'rounded-2xl bg-[#FFFFFF80] backdrop-blur-xl'
              )}></div>
            <div
              className={cn(
                styles['voteCard__shadow'],
                'absolute inset-0 -bottom-2 opacity-80 ',
                {
                  '-right-2': isRight,

                  '-left-2': isLeft,
                },
                ' rounded-2xl bg-[#FFFFFF80] backdrop-blur-xl'
              )}></div>
          </>
        )}
        <div
          className={cn(
            styles['voteCard__body'],
            { 'outline outline-4 outline-black': selected },
            'relative flex h-full w-full flex-col justify-between rounded-2xl bg-white p-6 text-black'
          )}
          style={{
            transformOrigin: placement,
            transform: `perspective(1000px) rotateY(${
              !isSkew ? '0deg' : isRight ? '-33deg' : '33deg'
            })`,
          }}>
          <div
            className="flex h-full grow select-none flex-col gap-2"
            onClick={onClick}>
            <Image
              alt={item.name}
              className="h-[170px] w-full rounded-2xl border-0 object-cover pb-2"
              height="300"
              src={item.image || '/nip.png'}
              width="300"
            />
            <div className="text-2xl font-bold">{item.name}</div>
            <div className={cn(styles['line-clamp-4'])}>
              {item.contributionDescription}
            </div>
            <div
              className={cn('pt-5 text-center transition-colors', {
                '': !selected,
                'text-red': selected,
              })}>
              {selected ? 'Voted' : 'Vote'}
            </div>
            {/* <div className="flex flex-col justify-end mb-3 grow">
              <div className="self-start p-1 border rounded-lg border-black-3">
                <div className="flex items-center gap-2 px-3 py-1 border rounded-lg border-gray-10">
                  {isSingleProject(item) ? <Browser /> : <Layers />}
                  <span className="text-sm font-IBM">
                    {isSingleProject(item)
                      ? 'Single project'
                      : `${item.numOfChildren || item.subProjects?.length}+ Projects`}
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center pt-5">
        <button
          className="mt-10 flex w-max gap-4 rounded-2xl bg-white px-4 py-3 text-black opacity-0 transition-opacity"
          onClick={onQuickView}>
          <span>Details</span>
          <Eye />
        </button>
      </div>

      {isRight ? (
        <CardBorderLeft
          className={cn('absolute', {
            '-right-14 -scale-x-100': isRight,
            '-top-0 bottom-0 object-none': isLeft,
          })}
          height={445}
          width={18}
        />
      ) : (
        <CardBorderRight
          className={cn('absolute -top-0', {
            '-right-32': isLeft,
            ' bottom-0 object-none': isRight,
          })}
          height={445}
          width={83}
        />
      )}
    </div>
  )
}

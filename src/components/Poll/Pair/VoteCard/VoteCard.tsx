/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import React from 'react'
import styles from './VoteCard.module.scss'
import cn from 'classnames'
import { Expand } from '@/components/Icon/Expand'
import Image from 'next/image'
import { PairType } from '@/types/Pairs/Pair'
import { Layers } from '@/components/Icon/Layers'
import { Browser } from '@/components/Icon/Browser'
import { CardBorderLeft } from '@/components/Icon/CardBorderLeft'
import { CardBorderRight } from '@/components/Icon/CardBorderRight'

interface VoteCardProps {
  placement: 'left' | 'right'
  varient?: 'skew' | 'normal' | 'fade'
  item: PairType
  selected?: boolean
  onQuickView: () => void
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
                'rounded-2xl backdrop-blur-xl  bg-[#FFFFFF80]'
              )}></div>
            <div
              className={cn(
                styles['voteCard__shadow'],
                'absolute inset-0 -bottom-6 opacity-50 ',
                {
                  '-right-6': isRight,
                  '-left-6': isLeft,
                },
                'rounded-2xl backdrop-blur-xl  bg-[#FFFFFF80]'
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
            'relative flex flex-col justify-between h-full w-full rounded-2xl bg-white p-6 text-black'
          )}
          style={{
            transformOrigin: placement,
            transform: `perspective(1000px) rotateY(${
              !isSkew ? '0deg' : isRight ? '-33deg' : '33deg'
            })`,
          }}>
          <div className="flex h-full grow flex-col  gap-2" onClick={onClick}>
            <img
              alt={item.name}
              className="h-[170px] w-full rounded-2xl border-0 object-cover"
              src={item.image}></img>
            <h3 className="font-Inter text-2xl font-bold">{item.name}</h3>
            <p className="line-clamp-3 font-Inter">{item.description}</p>
            <div className="mb-3 flex grow flex-col justify-end">
              <div className="self-start rounded-lg border border-black-3 p-1">
                <div className="flex items-center gap-2 rounded-lg border border-gray-10 px-3 py-1">
                  {item.numOfChildren ? <Layers /> : <Browser />}
                  <span className="font-IBM text-sm">
                    {item.numOfChildren
                      ? `${item.numOfChildren} + Projcets`
                      : 'Single project'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p
            className={cn('text-center transition-colors', {
              'opacity-20': !selected,
              'text-red': selected,
            })}>
            {selected ? 'Voted' : 'Vote'}
          </p>
        </div>
      </div>
      <button
        className="mt-10 flex w-max gap-4 rounded-2xl bg-white px-4 py-3 text-black opacity-0 transition-opacity"
        onClick={onQuickView}>
        <span>Quick view</span>
        <Expand />
      </button>

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

/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import React from 'react'
import styles from './VoteCard.module.scss'
import cn from 'classnames'
import { Expand } from '@/components/Icon/Expand'
import Image from 'next/image'
import { PairType } from '@/types/Pairs/Pair'
import { Layers } from '@/components/Icon/Layers'
import { Browser } from '@/components/Icon/Browser'

interface VoteCardProps {
  placement: 'left' | 'right'
  varient?: 'skew' | 'normal' | 'fade'
  item: PairType
  selected?: boolean
}

export const VoteCard: React.FC<
  VoteCardProps & React.HTMLProps<HTMLDivElement>
> = ({ item, placement = 'left', varient = 'normal', selected, ...props }) => {
  const isRight = placement === 'right'
  const isLeft = placement === 'left'
  const isSkew = varient === 'skew'
  return (
    <div className={cn(styles.voteCardWrapper, 'flex flex-col')} {...props}>
      <Image
        alt={'border-left'}
        className={`absolute h-[600px] ${
          isRight ? '-left-28 -scale-x-100' : '-left-16'
        }  -top-20 object-none`}
        height={800}
        src={
          isRight
            ? '/images/card-border-right.svg'
            : '/images/card-border-left.svg'
        }
        width={isRight ? 83 : 16}></Image>
      <div
        className={cn(
          styles.voteCard,
          styles[`voteCard--${varient}`],
          'relative h-[445px] w-[312px] cursor-pointer rounded-2xl'
        )}>
        {!selected && (
          <>
            {Boolean(item.numOfChildren) && (
              <>
                <div
                  className={cn(
                    styles['voteCard__shadow'],
                    'absolute inset-0 bottom-[-36px] opacity-50 ',
                    {
                      '-right-[36px]': isRight,
                      '-left-[36px]': isLeft,
                    },
                    'rounded-2xl backdrop-blur-xl  bg-[#FFFFFF80]'
                  )}></div>
                <div
                  className={cn(
                    styles['voteCard__shadow'],
                    'absolute inset-0 bottom-[-27px] opacity-50 ',
                    {
                      '-right-[27px]': isRight,
                      '-left-[27px]': isLeft,
                    },
                    'rounded-2xl backdrop-blur-xl  bg-[#FFFFFF80]'
                  )}></div>
                <div
                  className={cn(
                    styles['voteCard__shadow'],
                    'absolute inset-0 bottom-[-18px] opacity-70',
                    { '-right-[18px]': isRight, '-left-[18px]': isLeft },
                    'rounded-2xl bg-[#FFFFFF80] backdrop-blur-xl'
                  )}></div>
              </>
            )}
            <div
              className={cn(
                styles['voteCard__shadow'],
                'absolute inset-0 bottom-[-9px] opacity-80 ',
                {
                  '-right-[9px]': isRight,

                  '-left-[9px]': isLeft,
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
          <div className="flex h-full grow flex-col  gap-2">
            <img alt={item.name} className="h-[170px] w-full rounded-2xl border-0 object-cover" src={item.image}></img>
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
      <button className="mt-16 flex w-max gap-4 rounded-2xl bg-white px-4 py-3 text-black opacity-0 transition-opacity">
        <span>Quick view</span>
        <Expand />
      </button>

      <Image
        alt={'border-right'}
        className={`absolute h-[600px] ${
          isRight ? '-right-24 -scale-x-100' : '-right-32'
        }  -top-20 object-none`}
        height={484}
        src={
          isRight
            ? '/images/card-border-left.svg'
            : '/images/card-border-right.svg'
        }
        width={83}></Image>
    </div>
  )
}

import React, { useMemo } from 'react'
import { ArrowForward } from '@/components/Icon/ArrowForward'
import { Lock } from '@/components/Icon/Lock'
import { PlanetArrorw } from '@/components/Icon/PlanetArrorw'
import cn from 'classnames'
import { generateShapeID } from '@/utils/helpers'
import { PlanetShape } from '../PlanetShape'
import { PairType } from '@/types/Pairs/Pair'
import { Unlocked } from '@/components/Icon/Unlocked'
import { PodiumSharp } from '@/components/Icon/PodiumSharp'

interface ProjectPlanetProps {
  isRight?: boolean
  project: PairType
}

export const ProjectPlanet: React.FC<ProjectPlanetProps> = ({
  isRight,
  project,
}) => {
  const { name, locked, finished } = project
  const shapeID = useMemo(() => (name ? generateShapeID(name) : 1), [name])

  const btnClassName = finished ? 'bg-white text-black' : 'text-white bg-black'
  return (
    <>
      <PlanetShape id={shapeID} locked={locked} />
      <div
        className={cn('absolute top-1 flex whitespace-nowrap ', {
          'left-full': isRight,
          'right-full': !isRight,
        })}>
        {isRight && <PlanetArrorw className="mr-2" />}
        <div className="flex flex-col gap-2">
          <h4 className="flex items-center gap-2 font-IBM text-lg font-medium text-black">
            {name}
            {locked ? (
              <Lock className="text-black" />
            ) : (
              <Unlocked className="text-black" />
            )}
          </h4>
          {(finished || locked) && (
            <span className="font-IBM text-sm font-medium text-black">
              {finished ? '[Voted]' : '[Not finished]'}
            </span>
          )}
          {(!locked || finished) && (
            <button
              className={cn(
                btnClassName,
                'flex items-center gap-2  whitespace-nowrap rounded-3xl border-6 border-gray-200 bg-black p-2 px-4 text-lg '
              )}>
              <span className="font-medium">
                {finished ? 'Review' : 'Begin'}
              </span>
              {finished ? <PodiumSharp /> : <ArrowForward />}
            </button>
          )}
        </div>
        {!isRight && <PlanetArrorw className="ml-2 -scale-x-100" />}
      </div>
    </>
  )
}

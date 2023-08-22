import React, { useMemo } from 'react'
import { ArrowForward } from '@/components/Icon/ArrowForward'
import { Lock } from '@/components/Icon/Lock'
import { PlanetArrorw } from '@/components/Icon/PlanetArrorw'
import cn from 'classnames'
import { generateShapeID } from '@/utils/helpers'
import { PlanetShape } from '../PlanetShape'

interface ProjectPlanetProps {
  isRight?: boolean
  name?: string
  locked?: boolean
}

export const ProjectPlanet: React.FC<ProjectPlanetProps> = ({
  isRight,
  name,
  locked,
}) => {
  const shapeID = useMemo(() => (name ? generateShapeID(name) : 1), [name])
  return (
    <>
      <PlanetShape id={shapeID} locked={locked} />
      <div
        className={cn('absolute -top-1/3 flex ', {
          'left-full': isRight,
          'right-full': !isRight,
        })}>
        {isRight && <PlanetArrorw className="mr-2" />}
        <div className="flex flex-col gap-2">
          <h4 className="font-IBM text-lg font-medium text-black">{name}</h4>
          <button
            className={cn(
              'flex items-center gap-2  whitespace-nowrap rounded-3xl border-6 border-gray-100 bg-white p-2 px-4 text-lg text-black',
              { 'opacity-70': locked }
            )}
            onClick={() => {}}>
            <span className="font-medium">Start voting</span>
            {Math.random() > 0.5 ? (
              <ArrowForward className="text-black" />
            ) : (
              <Lock />
            )}
          </button>
        </div>
        {!isRight && <PlanetArrorw className="mr-2 -scale-x-100" />}
      </div>
    </>
  )
}

import React, { useMemo } from 'react'
import { ArrowForward } from '@/components/Icon/ArrowForward'
import { Lock } from '@/components/Icon/Lock'
import { Planet } from '@/components/Icon/Planet'
import { PlanetArrorw } from '@/components/Icon/PlanetArrorw'
import cn from 'classnames'
import { PlanetLocked } from '@/components/Icon/PlanetLocked'
import { generateShapeID } from '@/utils/helpers'
import { PlanetShape } from '../PlanetShape'

interface CollectionPlanetProps {
  name?: string
  locked?: boolean
}

export const CollectionPlanet: React.FC<CollectionPlanetProps> = ({
  name,
  locked,
}) => {
  const shapeID = useMemo(() => (name ? generateShapeID(name) : 1), [name])
  return (
    <>
      <PlanetShape id={shapeID} locked={locked} />
      <button
        className={cn(
          'absolute -bottom-1/4   flex items-center gap-2  whitespace-nowrap rounded-3xl border-6 border-gray-100 bg-white p-2 text-lg text-black',
          { 'opacity-70': locked }
        )}
        onClick={() => {}}>
        <span className="font-medium">{name}</span>
        {locked ? <Lock /> : <ArrowForward className="text-black" />}
      </button>
    </>
  )
}

import React, { useEffect, useMemo, useState } from 'react'
import { ArrowForward } from '@/components/Icon/ArrowForward'
import { Lock } from '@/components/Icon/Lock'
import cn from 'classnames'
import { generateShapeID } from '@/utils/helpers'
import { PlanetShape } from '../PlanetShape'
import { PlanetStatus, PlanetUnlocked } from '../PlanetStatus'
import { CollectionProgressStatus } from '../types'

interface CollectionPlanetProps {
  name: string
  locked: boolean
  progress: CollectionProgressStatus
  hasSubcollections: boolean
  hasCompositeProjects: boolean
}

export const CollectionPlanet: React.FC<CollectionPlanetProps> = ({
  name,
  locked,
  progress,
  hasSubcollections,
  hasCompositeProjects,
}) => {
  const [hover, setHover] = useState(false)
  const shapeID = useMemo(() => (name ? generateShapeID(name) : 1), [name])

  if (locked)
    return (
      <>
        <PlanetShape id={shapeID} locked={locked} />
        <button
          className={`absolute -bottom-1/4  flex items-center gap-2 whitespace-nowrap  rounded-3xl border-6 border-gray-100 bg-white p-2 text-lg text-black opacity-70`}
          onClick={() => {}}
          onMouseEnter={() => setHover(true)}>
          <span className="max-w-[256px] overflow-hidden text-ellipsis font-medium" title={name}>{name}</span>
          {locked ? <Lock /> : <ArrowForward className="text-black" />}
        </button>
      </>
    )

  return (
    <div className="relative flex flex-col">
      <PlanetShape id={shapeID} locked={locked} />
      <div className="absolute top-[125px]">
        <div
          className={cn('absolute opacity-0', {
            'opacity-100': hover,
          })}
          onMouseLeave={() => setHover(false)}>
          <PlanetStatus
            hasSubcollections={hasSubcollections || hasCompositeProjects}
            progress={progress}
            title={name || ''}
          />
        </div>
        <div
          className={cn('absolute', {
            'hidden': hover,
          })}
          onMouseEnter={() => setHover(true)}>
          <PlanetUnlocked progress={progress} title={name || ''} />
        </div>
      </div>
    </div>
  )
}

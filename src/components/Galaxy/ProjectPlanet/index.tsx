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
  const { name, progress } = project
  const shapeID = useMemo(() => (name ? generateShapeID(name) : 1), [name])

  const finishedOrAttested = progress === 'Finished' || progress === 'Attested'

  const statusText = () => {
    switch (progress) {
      case 'Pending':
        return 'Not ranked'
      case 'WIP':
        return 'In progress'
      case 'WIP - Threshold':
        return 'In progress'
      case 'Finished':
        return 'Ranked'
      case 'Attested':
        return 'List created'
    }
  }

  const btnClassName = finishedOrAttested
    ? 'bg-white text-black'
    : 'text-white bg-black'

  return (
    <>
      <PlanetShape id={shapeID} />
      <div
        className={cn('absolute top-1 flex whitespace-nowrap ', {
          'left-full': isRight,
          'right-full': !isRight,
        })}>
        {isRight && <PlanetArrorw className="mr-2" />}
        <div className="flex flex-col gap-2">
          <h4 className="flex items-center gap-2 text-lg font-medium text-black font-IBM">
            {name}
          </h4>
          <span className="text-sm font-medium text-black font-IBM">
            [{statusText()}]
          </span>

          {progress === 'Pending' && (
            <button
              className={cn(
                btnClassName,
                'flex w-fit items-center gap-2 whitespace-nowrap rounded-3xl border-6 border-gray-200 bg-black p-2 px-4 text-lg '
              )}>
              <span className="font-medium">Begin</span>
              <ArrowForward />
            </button>
          )}

          {(progress === 'WIP' || progress === 'WIP - Threshold') && (
            <button
              className={cn(
                btnClassName,
                'flex w-fit items-center gap-2 whitespace-nowrap rounded-3xl border-6 border-gray-200 bg-black p-2 px-4 text-lg '
              )}>
              <span className="font-medium">Continue</span>
              <ArrowForward />
            </button>
          )}

          {finishedOrAttested && (
            <button
              className={cn(
                btnClassName,
                'flex w-fit items-center gap-2 whitespace-nowrap rounded-3xl border-6 border-gray-200 bg-black p-2 px-4 text-lg '
              )}>
              <span className="font-medium">Ranking</span>
              <PodiumSharp />
            </button>
          )}
        </div>
        {!isRight && <PlanetArrorw className="ml-2 -scale-x-100" />}
      </div>
    </>
  )
}

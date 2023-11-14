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
import Button from '@/components/Button'

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
    ? 'bg-white text-black w-fit'
    : 'text-white bg-black w-fit'

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
            <Button
              varient="primary"
              className={btnClassName}
              theme="black"
              size="large">
              <span className="font-medium">Begin</span>
              <ArrowForward />
            </Button>
          )}

          {(progress === 'WIP' || progress === 'WIP - Threshold') && (
            <Button
              varient="primary"
              className={btnClassName}
              theme="black"
              size="large">
              <span className="font-medium">Continue</span>
              <ArrowForward />
            </Button>
          )}

          {finishedOrAttested && (
            <Button varient="primary" className={btnClassName} size="large">
              <span className="font-medium">Ranking</span>
              <PodiumSharp />
            </Button>
          )}
        </div>
        {!isRight && <PlanetArrorw className="ml-2 -scale-x-100" />}
      </div>
    </>
  )
}

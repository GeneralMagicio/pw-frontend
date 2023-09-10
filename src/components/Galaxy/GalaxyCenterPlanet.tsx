import { FC } from 'react'
import { Tick } from '../Icon/Tick'
import { ArrowForward } from '../Icon/ArrowForward'
import { PodiumSharp } from '../Icon/PodiumSharp'

interface Props {
  name: string
  onClick: () => void
  finished: boolean
}

export const GalaxyCenterPlanet: FC<Props> = ({ name, finished, onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        alt="center planet"
        className="mt-[-100px]"
        src="/images/center-galaxy.png"
        width={450}
      />
      <p className="mt-[-75px] text-2xl font-medium text-black"> {name} </p>
      {finished && (
        <button
          className="mt-6 flex items-center gap-2 whitespace-nowrap rounded-3xl border-6 bg-black px-4 py-2 font-Inter text-xl font-medium text-white"
          onClick={onClick}>
          Start voting
          <ArrowForward />
        </button>
      )}
      {!finished && (
        <button
          className="mt-6 flex items-center gap-2 whitespace-nowrap rounded-3xl border-6 border-gray-200 bg-white px-4 py-3 font-Inter text-xl font-medium text-black "
          onClick={onClick}>
          Check result
          <PodiumSharp />
        </button>
      )}
    </div>
  )
}
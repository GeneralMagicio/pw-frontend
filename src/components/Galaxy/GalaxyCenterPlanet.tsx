import { FC } from 'react'
import { PodiumSharp } from '../Icon/PodiumSharp'

interface Props {
  name: string
  onClick: () => void
}

export const GalaxyCenterPlanet: FC<Props> = ({ name, onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        alt="center planet"
        className="w-[450px]"
        src="/images/planets/S1-unlocked.svg"
      />
      <p className="mt-[-75px] text-2xl font-medium text-black"> {name} </p>
      <button
        className="flex items-center gap-2 px-4 py-3 mt-6 text-xl text-black bg-white border-gray-200 whitespace-nowrap rounded-3xl border-6 "
        onClick={onClick}>
        Review
        <PodiumSharp />
      </button>
    </div>
  )
}

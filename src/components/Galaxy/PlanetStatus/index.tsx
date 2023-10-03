import { ArrowForward } from '@/components/Icon/ArrowForward'
import { Check } from '@/components/Icon/Check'
import { PauseSharp } from '@/components/Icon/PauseSharp'

interface Props {
  finished: boolean
  hasSubcollections: boolean
  title: string
}

const Voted = () => {
  return (
    <p className="flex w-fit items-center rounded-3xl bg-gray-100 p-1 px-2 text-[#22B7A0]">
      <span className="mr-2">Complete</span>
      <Check className="scale-75" color="#22B7A0" />
    </p>
  )
}

const NotVoted = () => {
  return (
    <p className="flex w-fit items-center rounded-3xl bg-gray-100 p-1 px-2 text-[#1C64F2]">
      <span className="mr-2">Awaiting direction</span>
      <PauseSharp className="scale-75" />
    </p>
  )
}

export const PlanetStatus: React.FC<Props> = ({
  finished,
  hasSubcollections,
  title,
}) => {
  const action = hasSubcollections
    ? 'View Projects'
    : finished
    ? 'See Results'
    : 'Start ranking'
  return (
    <div
      className={`flex w-[195px] cursor-pointer flex-col items-center gap-2 whitespace-nowrap rounded-3xl border-6 border-gray-100 bg-white p-2 font-Inter text-black`}>
      <p className="max-w-[170px] overflow-hidden text-ellipsis text-base font-medium"> {title} </p>
      {finished ? <Voted /> : <NotVoted />}
      <div className=" flex items-center border-t border-gray-200 text-base font-medium">
        <p>{action}</p> <ArrowForward className="ml-2 scale-90" />
      </div>
    </div>
  )
}

export const PlanetUnlocked: React.FC<Omit<Props, 'hasSubcollections'>> = ({
  finished,
  title,
}) => {
  return (
    <div
      className={`flex w-[195px] cursor-pointer flex-col items-center gap-2 whitespace-nowrap rounded-3xl border-6 border-gray-100 bg-white p-2 font-Inter text-black`}>
      <p className="max-w-[170px] overflow-hidden text-ellipsis text-base font-medium"> {title} </p>
      {finished ? <Voted /> : <NotVoted />}
    </div>
  )
}

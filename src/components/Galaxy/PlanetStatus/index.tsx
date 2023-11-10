import { ArrowForward } from '@/components/Icon/ArrowForward'
import { Check } from '@/components/Icon/Check'
import { CollectionProgressStatus } from '../types'
import { PauseSharp } from '@/components/Icon/PauseSharp'

interface Props {
  progress: CollectionProgressStatus
  hasSubcollections: boolean
  title: string
}

const WIP = () => {
  return (
    <p className="flex items-center whitespace-nowrap rounded-3xl bg-[#22B7A01A] p-1 px-2 text-[#22B7A0]">
      In Progress
      <Check className="ml-1 scale-75" color="#22B7A0" />
    </p>
  )
}

const Finished = () => {
  return (
    <p className="flex items-center whitespace-nowrap rounded-3xl bg-[#22B7A01A] p-1 px-2 text-[#22B7A0]">
      Ranked
      <Check className="ml-1 scale-75" color="#22B7A0" />
    </p>
  )
}

const Pending = () => {
  return <p className=" text-[#1C64F2]">Not ranked</p>
}

export const PlanetStatus: React.FC<Props> = ({
  progress,
  hasSubcollections,
  title,
}) => {
  const action =
    progress === 'Pending'
      ? 'Begin ranking'
      : progress === 'WIP'
      ? 'Continue'
      : 'See results'
  return (
    <div
      className={`flex w-[220px] cursor-pointer flex-col items-start gap-2 rounded-3xl border-6 border-gray-100 bg-white p-3  text-black`}>
      <p className="overflow-hidden text-ellipsis text-base font-medium ">
        {title}
      </p>
      {progress === 'Finished' || progress === 'Attested' ? (
        <Finished />
      ) : progress === 'WIP' ? (
        <WIP />
      ) : (
        <Pending />
      )}
      <hr className="my-2 w-full" />
      <div className="flex items-center justify-between rounded-3xl px-2 py-1 text-base font-medium hover:bg-gray-100">
        <p>{action}</p> <ArrowForward className="ml-2 scale-90" />
      </div>
    </div>
  )
}

export const PlanetUnlocked: React.FC<Omit<Props, 'hasSubcollections'>> = ({
  progress,
  title,
}) => {
  return (
    <div
      className={`flex w-[220px] cursor-pointer flex-col items-start gap-2 rounded-3xl border-6 border-gray-100 bg-white p-3  text-black`}>
      <p className="overflow-hidden text-ellipsis text-base font-medium ">
        {title}
      </p>
      {progress === 'Finished' || progress === 'Attested' ? (
        <Finished />
      ) : progress === 'WIP' ? (
        <WIP />
      ) : (
        <Pending />
      )}
    </div>
  )
}

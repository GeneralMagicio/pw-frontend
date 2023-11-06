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
    <p className="flex w-fit items-center rounded-3xl bg-gray-100 p-1 px-2 text-[#8c00af]">
      <span className="mr-2">In Progress</span>
      <Check className="scale-75" color="#8c00af" />
    </p>
  )
}

const Finished = () => {
  return (
    <p className="flex w-fit items-center rounded-3xl bg-gray-100 p-1 px-2 text-[#22B7A0]">
      <span className="mr-2">Ranked</span>
      <Check className="scale-75" color="#22B7A0" />
    </p>
  )
}

const Pending = () => {
  return (
    <p className="flex w-fit items-center rounded-3xl bg-gray-100 p-1 px-2 text-[#1C64F2]">
      <span className="mr-2">Not ranked</span>
    </p>
  )
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
      className={`flex w-[195px] cursor-pointer flex-col items-start gap-2 whitespace-nowrap rounded-3xl border-6 border-gray-100 bg-white p-3  text-black`}>
      <p className="max-w-[170px] overflow-hidden text-ellipsis text-base font-medium ">
        {title}
      </p>
      {progress === 'Finished' ? (
        <Finished />
      ) : progress === 'WIP' ? (
        <WIP />
      ) : (
        <Pending />
      )}
      <hr className="w-full" />
      <div className="flex items-center justify-between text-base font-medium">
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
      className={`flex w-[195px] cursor-pointer flex-col items-start gap-2 whitespace-nowrap rounded-3xl border-6 border-gray-100 bg-white p-3  text-black`}>
      <p className="max-w-[170px] overflow-hidden text-ellipsis text-base font-medium ">
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

import { Shuffle } from "../Icon/Shuffle"
import { Tick } from "../Icon/Tick"

interface Props {
  onDone: () => void;
  onEdit: () => void;
}

export const RankingHeader: React.FC<Props> = ({onDone, onEdit}) => {


  return (
    <header className="relative flex  h-[95px] items-center justify-between gap-4 bg-gray-30 px-48 text-lg font-semibold text-black">
    <h4 className="font-IBM text-2xl font-bold">Review votes</h4>
    <div className="flex items-center gap-2">
      <button
        className="flex items-center gap-2  whitespace-nowrap rounded-xl border-6 border-gray-30 bg-gray-50 px-6 py-2 text-lg"
        onClick={onEdit}>
        Edit votes
        <Shuffle />
      </button>{' '}
      <button
        className="flex items-center gap-2 whitespace-nowrap rounded-xl  border-6 border-gray-4 bg-black px-6  py-2 text-lg text-white"
        onClick={onDone}>
        Done
        <Tick />
      </button>
    </div>
  </header>
  )
}
import { ArrowBackward } from '@/components/Icon/ArrowBackward'
import { Close } from '@/components/Icon/Close'
import { Shuffle } from '@/components/Icon/Shuffle'
import { Star } from '@/components/Icon/Star'
import { Tick } from '@/components/Icon/Tick'
import router from 'next/router'

interface Props {
  onAttest: () => void
  onEdit: () => void
  onBack: () => void
  editMode: boolean
  onUpdate: () => void
  error: boolean
}

export const OverallRankingHeader: React.FC<Props> = ({
  onAttest,
  onEdit,
  editMode,
  onBack,
  onUpdate,
  error,
}) => {
  return (
    <header className="relative flex  h-[95px] items-center justify-between gap-4 bg-gray-30 px-36 font-IBM text-lg font-semibold text-black">
      <button
        className="flex w-36 items-center justify-center gap-2 whitespace-nowrap rounded-xl border-6 border-gray-100 bg-white py-2 font-normal text-black"
        onClick={onBack}>
        {!editMode ? (
          <>
            <ArrowBackward className="scale-75" />
            <span>Back</span>
          </>
        ) : (
          <>
            <span>Cancel</span>
            <Close className="scale-[70%]" />
          </>
        )}
      </button>
      <h4 className="font-IBM text-2xl font-bold">
        {editMode ? 'Editing votes' : 'Check All Votes'}
      </h4>
      <div className="flex items-center gap-2">
        {error ? (
          <button
            className="flex h-14 w-56  items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 border-[#ff0000] bg-gray-50 text-xl"
            id="invalid-value-overall-ranking"
            onClick={() => {}}>
            Invalid value!
          </button>
        ) : editMode ? (
          <button
            className="flex h-14 w-56  items-center justify-center gap-2 whitespace-nowrap rounded-xl border-6 border-gray-30 bg-gray-50 text-lg"
            onClick={onUpdate}>
            Update votes
            <Tick color="black" />
          </button>
        ) : (
          <button
            className="flex h-14 w-56  items-center justify-center gap-2 whitespace-nowrap rounded-xl border-6 border-gray-30 bg-gray-50 text-lg"
            onClick={onEdit}>
            Edit votes
            <Shuffle />
          </button>
        )}
        <button
          className="flex items-center gap-2 whitespace-nowrap rounded-xl  border-6 border-gray-4 bg-black px-6  py-2 text-lg text-white"
          onClick={onAttest}>
          Attest
        </button>
      </div>
    </header>
  )
} 
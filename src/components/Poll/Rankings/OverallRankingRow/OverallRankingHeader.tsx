import { ArrowBackward } from '@/components/Icon/ArrowBackward'
import { Close } from '@/components/Icon/Close'
import { Shuffle } from '@/components/Icon/Shuffle'
import { Star } from '@/components/Icon/Star'
import { Tick } from '@/components/Icon/Tick'
import router from 'next/router'

interface Props {
  onAttest?: () => void
  onDone?: () => void
  onEdit: () => void
  onBack: () => void
  editMode: boolean
  onUpdate: () => void
  error: boolean
  isOverallRanking: boolean
}

export const OverallRankingHeader: React.FC<Props> = ({
  onAttest,
  onEdit,
  editMode,
  onBack,
  onUpdate,
  onDone,
  error,
  isOverallRanking,
}) => {
  return (
    <header className="relative flex  h-[95px] items-center justify-between gap-4 bg-gray-30 px-36 font-IBM text-lg font-semibold text-black">
      <div className="flex justify-start w-64">
        <button
          className="flex items-center justify-center gap-2 px-5 py-2 text-black bg-white border-gray-100 whitespace-nowrap rounded-xl border-6"
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
      </div>
      <h4 className="text-2xl font-bold font-IBM">
        {editMode
          ? 'Editing…'
          : isOverallRanking
          ? 'Ranking'
          : 'Adjust Project Percentages'}
      </h4>
      <div className="flex justify-end w-64">
        <div className="flex items-center gap-2">
          {error ? (
            <button
              className="flex h-14 items-center  justify-center gap-2 whitespace-nowrap rounded-xl border-2 border-[#ff0000] bg-gray-50 px-5 text-xl"
              id="invalid-value-overall-ranking"
              onClick={() => {}}>
              Invalid value!
            </button>
          ) : editMode ? (
            <button
              className="flex items-center justify-center gap-2 px-5 text-lg h-14 whitespace-nowrap rounded-xl border-6 border-gray-30 bg-gray-50"
              onClick={onUpdate}>
              Save
              <Tick color="black" />
            </button>
          ) : (
            <button
              className="flex items-center justify-center gap-2 px-5 text-lg h-14 whitespace-nowrap rounded-xl border-6 border-gray-30 bg-gray-50"
              onClick={onEdit}>
              Edit
              <Shuffle />
            </button>
          )}
          {onDone ? (
            <button
              className="flex items-center gap-2 px-6 py-2 text-lg text-white bg-black whitespace-nowrap rounded-xl border-6 border-gray-4"
              onClick={onDone}>
              Done
            </button>
          ) : onAttest ? (
            <button
              className="flex items-center gap-2 px-6 py-2 text-lg text-white bg-black whitespace-nowrap rounded-xl border-6 border-gray-4"
              onClick={onAttest}>
              Attest
            </button>
          ) : null}
        </div>
      </div>
    </header>
  )
}

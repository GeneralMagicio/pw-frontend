import { ArrowBackward } from '@/components/Icon/ArrowBackward'
import { Close } from '@/components/Icon/Close'
import { Shuffle } from '@/components/Icon/Shuffle'
import cn from 'classnames'
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
      <div className="flex w-64 justify-start">
        <button
          className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border-6 border-gray-100 bg-white px-5 py-2 text-black"
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
      <h4 className="font-IBM text-2xl font-bold">
        {editMode
          ? 'Editing…'
          : isOverallRanking
          ? 'Ranking'
          : 'Adjust Project Percentages'}
      </h4>
      <div className="flex w-64 justify-end">
        <div className="flex items-center gap-2">
          {editMode ? (
            <button
              className={`flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-xl border-6 bg-gray-50 border-gray-30 px-5 text-lg ${
                error ? 'opacity-50' : ''
              }`}
              onClick={onUpdate}
              disabled={error}>
              Save
              <Tick color="black" />
            </button>
          ) : (
            <button
              className="flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-xl border-6 border-gray-30 bg-gray-50 px-5 text-lg"
              onClick={onEdit}>
              Edit
              <Shuffle />
            </button>
          )}
          {onDone ? (
            <button
              className="flex items-center gap-2 whitespace-nowrap rounded-xl border-6 border-gray-4 bg-black px-6 py-2 text-lg text-white"
              onClick={onDone}>
              Done
            </button>
          ) : onAttest ? (
            <button
              className="flex items-center gap-2 whitespace-nowrap rounded-xl border-6 border-gray-4 bg-black px-6 py-2 text-lg text-white"
              onClick={onAttest}>
              Attest
            </button>
          ) : null}
        </div>
      </div>
    </header>
  )
}

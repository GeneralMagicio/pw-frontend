import { ArrowBackward } from '@/components/Icon/ArrowBackward'
import { Close } from '@/components/Icon/Close'
import { Shuffle } from '@/components/Icon/Shuffle'
import cn from 'classnames'
import { Star } from '@/components/Icon/Star'
import { Tick } from '@/components/Icon/Tick'
import router from 'next/router'
import Button from '@/components/Button'

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
        <Button varient="primary" size="large" onClick={onBack}>
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
        </Button>
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
            <Button
              className={error ? 'opacity-50' : ''}
              varient="primary"
              size="large"
              onClick={onUpdate}>
              Save
              <Tick color="currentColor" />
            </Button>
          ) : (
            <Button varient="primary" size="large" onClick={onEdit}>
              Edit
              <Shuffle />
            </Button>
          )}
          {onDone ? (
            <Button
              varient="primary"
              theme="black"
              size="large"
              onClick={onDone}>
              Done
            </Button>
          ) : onAttest ? (
            <Button
              varient="primary"
              theme="black"
              size="large"
              onClick={onAttest}>
              Attest
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  )
}

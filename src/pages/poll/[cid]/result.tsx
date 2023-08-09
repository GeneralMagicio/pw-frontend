import { Shuffle } from '@/components/Icon/Shuffle'

export default function Result() {
  return (
    <>
      <header className="relative flex  h-[95px] bg-gray-30 items-center justify-between gap-4 px-48 text-lg font-semibold text-black">
        <h4 className="font-bold font-IBM text-2xl">Review votes</h4>
        <div className="flex gap-2 items-center">
          <button
            className="flex items-center gap-2  whitespace-nowrap rounded-xl border-6 border-gray-30 bg-gray-50 px-6 py-2 text-lg"
            onClick={() => {}}>
            Edit votes
            <Shuffle />
          </button>{' '}
          <button
            className="flex items-center gap-2 bg-black text-white  whitespace-nowrap rounded-xl border-6 border-black-30  px-6 py-2 text-lg"
            onClick={() => {}}>
            Done
            <Shuffle />
          </button>
        </div>
      </header>
    </>
  )
}

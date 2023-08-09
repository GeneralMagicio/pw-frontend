import { Shuffle } from '@/components/Icon/Shuffle'
import { Tick } from '@/components/Icon/Tick'
import { Rankings } from '@/components/Poll/Rankings'
import { RankingsType } from '@/types/Ranking/indes'
import { getRankings } from '@/utils/poll'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function RankingPage() {
  const router = useRouter()
  const [rankings, setRankings] = useState<RankingsType>([])

  useEffect(() => {
    if (router.query.cid)
      getRankings(Number(router.query.cid)).then(setRankings)
  }, [router.query.cid, setRankings])

  return (
    <>
      <header className="relative flex  h-[95px] items-center justify-between gap-4 bg-gray-30 px-48 text-lg font-semibold text-black">
        <h4 className="font-IBM text-2xl font-bold">Review votes</h4>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2  whitespace-nowrap rounded-xl border-6 border-gray-30 bg-gray-50 px-6 py-2 text-lg"
            onClick={() => {}}>
            Edit votes
            <Shuffle />
          </button>{' '}
          <button
            className="flex items-center gap-2 whitespace-nowrap rounded-xl  border-6 border-gray-4 bg-black px-6  py-2 text-lg text-white"
            onClick={() => {}}>
            Done
            <Tick />
          </button>
        </div>
      </header>
      <Rankings items={rankings} />
    </>
  )
}

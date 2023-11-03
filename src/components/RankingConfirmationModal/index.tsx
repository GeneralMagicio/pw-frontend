import { useRouter } from 'next/router'
import { ArrowForward } from '../Icon/ArrowForward'
import { PairsType } from '@/types/Pairs'
import { Pencil } from '../Icon/Pencil'
import { Plus } from '../Icon/Plus'
import { ArrowBackward } from '../Icon/ArrowBackward'
import { useEffect, useState } from 'react'
import { CollectionRanking } from '../Poll/Rankings/edit-logic/edit'
import { getRankings } from '@/utils/poll'
import { Check } from '../Icon/Check'

interface RankingConfirmationModalProps {
  collection: PairsType
  handleFinish: () => void
}

export const RankingConfirmationModal: React.FC<
  RankingConfirmationModalProps
> = ({ collection, handleFinish }) => {
  const [rankings, setRankings] = useState<CollectionRanking>()
  const router = useRouter()

  useEffect(() => {
    const main = async () => {
      if (router.query.cid) {
        const data = await getRankings(String(router.query.cid))
        setRankings(data)
      }
    }
    main()
  }, [router.query.cid])
  return (
    <>
      <div className="flex max-w-[800px]  flex-col justify-center gap-10 font-IBM">
        <header className="mb-2 flex w-full ">
          <h3 className="text-2xl font-bold">Well done</h3>
        </header>

        <p className="text-xl font-normal">
          you have finished ranking of{' '}
          <span className="font-medium">
            {collection.name || 'DeFi, Decentralized Finance'}
          </span>
          , now you can create list or continue ranking other projects.
        </p>
        <div className="rounded-xl bg-grayish py-4 px-6 min-h-[270px]">
          <header className="flex items-center justify-between border-b pb-4 border-gray-10">
            <p className="font-Inter text-base font-medium">
              Review your ranking
            </p>
            <button
              className="flex items-center justify-center rounded-xl border border-black p-2 px-3 font-IBM text-base font-medium"
              onClick={handleFinish}>
              Edit
              <Pencil className="ml-2" />
            </button>
          </header>
          <div className="flex flex-col gap-4 mt-4 max-h-[160px] overflow-y-auto font-Inter text-base">
            {rankings && (
              <div className="flex items-center gap-6 rounded-xl  text-black">
                <span className="grow font-medium flex  gap-4 items-center ">
                  {rankings.name}
                  {rankings.hasRanking && (
                    <span className="flex items-center text-xs whitespace-nowrap rounded-lg px-2 py-1  text-[#22B7A0] bg-[#22B7A01A]">
                      Ranked
                      <Check className="ml-2" color="#22B7A0" width={14} />
                    </span>
                  )}
                  {rankings.progress !== 'Attested' && (
                    <span className="flex items-center text-xs whitespace-nowrap rounded-lg px-2 py-1  text-[#F36600] bg-[#F366001A]">
                      Not listed
                    </span>
                  )}
                </span>
                <span className="flex items-center relative w-20 text-right font-medium">
                  <span className="">
                    {(rankings?.share * 3e6).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span className="absolute -right-5 mb-1 ml-1 align-super text-[8px] text-red">
                    OP
                  </span>
                </span>
                <span className="flex w-[20%] items-center justify-center">
                  <span className="mr-1 text-[8px] text-red">%</span>
                  <span className="">
                    {(rankings?.share * 100).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </span>
              </div>
            )}
            {rankings?.ranking.map((ranking) => (
              <div
                className="flex items-center gap-6 rounded-xl pl-6  text-black"
                key={ranking.id}>
                <span className="grow">{ranking.name} </span>
                <span className="flex items-center w-20 text-right">
                  <span className="">
                    {(ranking.share * 3e6).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </span>
                <span className="flex w-[20%] items-center justify-center">
                  <span className="mr-1 text-[8px] text-red">%</span>
                  <span className="">
                    {(ranking.share * 100).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <footer className="flex items-center justify-between">
          <button
            className="flex h-[50px] items-center justify-center rounded-full border border-black p-2 px-8 text-sm"
            onClick={() => router.back()}>
            {'Rank other projects'}
            <ArrowForward className="ml-4" />
          </button>
          <button
            className={
              'flex h-12 w-fit items-center self-center rounded-full bg-black px-8 py-2  text-white'
            }>
            Create list <Plus className="ml-2" />
          </button>
        </footer>
      </div>
    </>
  )
}

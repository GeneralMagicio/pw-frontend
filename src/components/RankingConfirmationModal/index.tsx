import { getCollection, getRankings } from '@/utils/poll'
import { useEffect, useState } from 'react'

import { ArrowForward } from '../Icon/ArrowForward'
import { AttestationModal } from '../Poll/Rankings/OverallRankingRow/AttestationModal'
import { Check } from '../Icon/Check'
import { CollectionRanking } from '../Poll/Rankings/edit-logic/edit'
import { PairType } from '@/types/Pairs/Pair'
import { Pencil } from '../Icon/Pencil'
import { Plus } from '../Icon/Plus'
import { useRouter } from 'next/router'

export const RankingConfirmationModal: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [rankings, setRankings] = useState<CollectionRanking>()
  const [collection, setCollection] = useState<PairType>()
  const router = useRouter()

  useEffect(() => {
    const main = async () => {
      if (router.query.cid) {
        const [data, collection] = await Promise.all([
          getRankings(String(router.query.cid)),
          getCollection(Number(router.query.cid)),
        ])
        setCollection(collection)
        setRankings(data)
      }
    }
    main()
  }, [setRankings, router.query.cid])
  return (
    <>
      <div className="flex max-w-[800px]  flex-col justify-center gap-10 font-IBM">
        {open && rankings && collection && (
          <AttestationModal
            collectionId={collection.id}
            collectionName={collection.name}
            colletionDescription={collection.impactDescription}
            isOpen={open}
            onClose={() => setOpen(false)}
          />
        )}
        <header className="mb-2 flex w-full ">
          <h3 className="text-2xl font-bold">Well done!</h3>
        </header>

        <p className="text-xl font-normal">
          You have finished ranking of{' '}
          <span className="font-medium">{collection?.name || ''}</span>, now you
          can create list or continue ranking other projects.
        </p>
        <div className="min-h-[270px] rounded-xl bg-grayish py-4 px-6">
          <header className="flex items-center justify-between border-b border-gray-10 pb-4">
            <p className="font-Inter text-base font-medium">
              Review your ranking
            </p>
            <button
              className="flex items-center justify-center rounded-xl border border-black p-2 px-3 font-IBM text-base font-medium"
              onClick={() => router.push('/ranking')}>
              Edit
              <Pencil className="ml-2" />
            </button>
          </header>
          <div className="mt-4 flex max-h-[160px] flex-col gap-4 overflow-y-auto font-Inter text-base">
            {rankings && (
              <div className="flex items-center gap-6 rounded-xl text-black">
                <span className="flex grow items-center gap-4 font-medium ">
                  {rankings.name}
                  {rankings.hasRanking && (
                    <span className="flex items-center whitespace-nowrap rounded-lg bg-[#22B7A01A] px-2 py-1  text-xs text-[#22B7A0]">
                      Ranked
                      <Check className="ml-2" color="#22B7A0" width={14} />
                    </span>
                  )}
                  {rankings.progress !== 'Attested' && (
                    <span className="flex items-center whitespace-nowrap rounded-lg bg-[#F366001A] px-2 py-1  text-xs text-[#F36600]">
                      Not listed
                    </span>
                  )}
                </span>
                <span className="relative flex w-20 items-center text-right font-medium">
                  <span className="">
                    {(rankings?.share * 3e7).toLocaleString(undefined, {
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
                className="flex items-center gap-6 rounded-xl pl-6 text-black"
                key={ranking.id}>
                <span className="grow">{ranking.name} </span>
                <span className="flex w-20 items-center text-right">
                  <span className="">
                    {(ranking.share * 3e7).toLocaleString(undefined, {
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
            }
            onClick={() => setOpen(true)}>
            Create list <Plus className="ml-2" />
          </button>
        </footer>
      </div>
    </>
  )
}

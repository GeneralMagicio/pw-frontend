import { useEffect, useState } from 'react'
import { PairType } from '@/types/Pairs/Pair'
import { useRouter } from 'next/router'
import { formatRankingValue } from '@/utils/helpers'
import { Ranking, getRankings } from './RankingConfirmationModal'
import { EditManualModal } from './EditManualModal'
import { AttestationModal } from './AttestationModal'
import Button from '@/components/Button'
import { ArrowForward } from '@/components/Icon/ArrowForward'
import { Pencil } from '@/components/Icon/Pencil'
import { Plus } from '@/components/Icon/Plus'

export const HalfwayConfirmationModal: React.FC<{
  handleClose: () => void
  listId: string
}> = ({ handleClose, listId }) => {
  const [open, setOpen] = useState(false)
  const [editConfirmationOpen, setEditConfirmationOpen] = useState(false)
  const [rankings, setRankings] = useState<Ranking>()
  const [collection, setCollection] = useState<PairType>()
  const router = useRouter()

  useEffect(() => {
    const main = async () => {
      const data = await getRankings(listId)
      console.log('data in confirmation is:', data)
      setRankings(data)
    }
    main()
  }, [listId])

  return (
    <>
      <div className="flex max-w-[800px]  flex-col justify-center gap-5 font-IBM">
        {collection && (
          <EditManualModal
            isOpen={editConfirmationOpen}
            onClose={() => setEditConfirmationOpen(false)}
            listId={listId}
          />
        )}
        {open && rankings && collection && (
          <AttestationModal
            collectionId={collection.id}
            collectionName={collection.name}
            colletionDescription={collection.impactDescription}
            isOpen={open}
            onClose={() => (window.location.href = '/galaxy')}
          />
        )}
        <header className="flex w-full mb-2 ">
          <h3 className="text-2xl font-bold">Well done!</h3>
        </header>

        <p className="text-xl font-normal">
          You have finished half the available votes in{' '}
          <span className="font-medium">{collection?.name || ''}</span>, now you
          can create list or continue ranking.
        </p>
        <div className="min-h-[270px] rounded-xl bg-grayish py-4 px-6">
          <header className="flex items-center justify-between pb-4 border-b border-gray-10">
            <p className="text-base font-medium font-Inter">
              Review your ranking
            </p>
            <Button
              varient="secondary"
              className="rounded-xl"
              onClick={() => setEditConfirmationOpen(true)}>
              Edit
              <Pencil />
            </Button>
          </header>
          <div className="mt-4 flex max-h-[160px] flex-col gap-4 overflow-y-auto font-Inter text-base">
            {rankings && (
              <div className="flex items-center gap-6 text-black rounded-xl">
                <span className="flex items-center gap-4 font-medium grow ">
                  {rankings.name}
                </span>
                <span className="relative flex items-center w-20 font-medium text-right">
                  <span className="">{formatRankingValue(rankings.share)}</span>
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
                className="flex items-center gap-6 pl-6 text-black rounded-xl"
                key={ranking.id}>
                <span className="grow">{ranking.name} </span>
                <span className="flex items-center w-20 text-right">
                  <span className="">{formatRankingValue(ranking.share)}</span>
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
          <Button onClick={handleClose} varient="secondary" size="large">
            {'Continue'}
            <ArrowForward />
          </Button>
          <Button
            varient="secondary"
            size="large"
            onClick={() => setOpen(true)}>
            Create list <Plus />
          </Button>
        </footer>
      </div>
    </>
  )
}

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { formatRankingValue } from '@/utils/helpers'
import Button from '@/components/Button'
import { ArrowForward } from '@/components/Icon/ArrowForward'
import { Pencil } from '@/components/Icon/Pencil'
import { Plus } from '@/components/Icon/Plus'
import { AttestationModal } from './AttestationModal'
import { EditManualModal } from './EditManualModal'
import { getRankingStorageKey } from '../utils'

interface Props {
  collection: {
    id: number
    name: string
    impactDescription: string
  }
  listId: string
  handleFinish: () => void;
}

export interface Ranking {
  id: number;
  hasRanking: true,
  type: "collection" | "composite project"
  isTopLevel: boolean,
  name: string
  share: number
  progress: "Finished"
  RPGF3Id: string
  ranking: Omit<Ranking, "ranking" | "progress">[]
}

export const getRankings = async (listId: string): Promise<Ranking> => {
  console.log("the key:", getRankingStorageKey(listId))
  const str = window.localStorage.getItem(getRankingStorageKey(listId))
  console.log("str is:", str)
  const ranking = str ? (JSON.parse(str) as Ranking['ranking']) : []

  return {
    id: -1,
    type: "collection",
    hasRanking: true,
    isTopLevel: false,
    name: 'Custom list',
    progress: "Finished",
    share: 1,
    RPGF3Id: "-1",
    ranking,
  }
}

export const RankingConfirmationModal: React.FC<Props> = ({
  collection,
  listId,
}) => {
  const [open, setOpen] = useState(false)
  const [editConfirmationOpen, setEditConfirmationOpen] = useState(false)
  const [rankings, setRankings] = useState<Ranking>()
  // const [collection, setCollection] = useState<PairType>()
  const router = useRouter()

  useEffect(() => {
    const main = async () => {
      const data = await getRankings(listId)
      setRankings(data)
    }
    main()
  }, [listId])

  if (!rankings?.ranking) return null

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
          You have finished ranking of{' '}
          <span className="font-medium">{collection?.name || ''}</span>, now you
          can create list or continue ranking other projects.
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

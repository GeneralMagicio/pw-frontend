import { ArrowForward } from '@/components/Icon/ArrowForward'
import { ArrowForwardSharp } from '@/components/Icon/ArrowForwardSharp'
import { Browser } from '@/components/Icon/Browser'
import { Close } from '@/components/Icon/Close'
import { Layers } from '@/components/Icon/Layers'
import { PairType } from '@/types/Pairs/Pair'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface VoteModalProps {
  item: PairType
  handeClose: () => void
}
export const VoteModal: React.FC<VoteModalProps> = ({ handeClose, item }) => {
  const router = useRouter()
  return (
    <>
      <div className="relative flex  min-w-[700px] flex-col  gap-6">
        <div className="flex flex-col">
          <header className="mb-2 flex justify-between">
            <h3 className="font-Inter text-3xl font-bold">{item.name}</h3>
            <Close className="cursor-pointer" onClick={handeClose} />
          </header>
          <div className="self-start rounded-lg border border-black-3 p-1">
            <div className="flex items-center gap-2 rounded-lg border border-gray-10 px-3 py-1">
              {item.numOfChildren ? <Layers /> : <Browser />}
              <span className="font-IBM text-sm">
                {item.numOfChildren
                  ? `${item.numOfChildren} + Projects`
                  : 'Single project'}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-[73px]  flex max-h-[437px] flex-col overflow-auto">
          <div className="flex gap-7">
            <img
              alt={item.name}
              className="h-[360px] w-[360px] shrink-0 rounded-2xl"
              height={360}
              src={item.image}
              width={360}
            />
            <div className="flex  grow flex-col gap-6 overflow-auto  font-Inter text-lg">
              <div className="flex flex-col gap-2">
                <p
                  dangerouslySetInnerHTML={{
                    __html: item.description || item.name,
                  }}
                />
              </div>
            </div>
          </div>
          {!item.childProjects?.length ? null : (
            <div className="mb-10 mt-6 font-Inter">
              <h5 className="border-b border-b-gray-10 pb-2 text-lg">
                {item.childProjects.length} projects
              </h5>
              <div className="mt-4 flex w-full flex-wrap gap-7">
                {item.childProjects.map((child) => (
                  <div className="flex w-1/4 gap-4" key={child.id}>
                    <img
                      alt={item.name}
                      className="h-12 w-12 shrink-0 rounded"
                      src={child.image}
                    />
                    <div className="flex flex-col gap-[2px]">
                      <span className="font-medium">{child.name}</span>
                      <span className="hidden font-medium text-neutral-600-gray">
                        @defillama
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <footer className="absolute inset-x-0 bottom-0 flex justify-between bg-white p-10 pt-6 font-IBM">
        <button
          className={
            'flex  min-w-fit items-center justify-center rounded-full border border-dark  px-8 text-sm'
          }>
          See all details
          <ArrowForwardSharp className="ml-1" />
        </button>
        {item.childProjects?.length ? (
          <button
            className={
              ' flex  min-w-fit items-center justify-center rounded-full border border-black bg-black  px-8 text-sm text-white'
            }
            onClick={() => {
              router.push(`/poll/${item.id}`)
            }}>
            Start voting on this collection
            <ArrowForward className="ml-1" />
          </button>
        ) : (
          <div />
        )}
      </footer> */}
    </>
  )
}

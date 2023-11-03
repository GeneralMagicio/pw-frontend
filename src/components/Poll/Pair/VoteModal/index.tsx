import { ArrowForward } from '@/components/Icon/ArrowForward'
import { ArrowForwardSharp } from '@/components/Icon/ArrowForwardSharp'
import { Browser } from '@/components/Icon/Browser'
import { Close } from '@/components/Icon/Close'
import { sanitize } from 'dompurify'
import Image from 'next/image'
import { Layers } from '@/components/Icon/Layers'
import { PairType } from '@/types/Pairs/Pair'
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
          <header className="flex justify-between mb-2">
            <h3 className="text-2xl font-bold ">{item.name}</h3>
            <Close className="cursor-pointer" onClick={handeClose} />
          </header>
          {item.numOfChildren > 0 && (
            <div className="self-start p-1 border rounded-lg border-black-3">
              <div className="flex items-center gap-2 px-3 py-1 border rounded-lg border-gray-10">
                <Layers />
                <span className="text-sm font-IBM">
                  {`${item.numOfChildren} + Projects`}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="mb-[45px]  flex max-h-[500px] flex-col overflow-auto">
          <div className="flex justify-between">
            <div className="flex min-w-[360px] flex-col gap-4">
              <img
                alt={item.name}
                className="w-full shrink-0 rounded-2xl"
                src={item.image || '/nip.png'}
              />
              <div>
                <span className="font-medium"> Website: </span>
                <a href={item.url} rel="noreferrer" target="_blank">
                  {item.url}
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-6 px-4 overflow-auto text-lg font-Inter">
              <div className="flex flex-col gap-2">
                <p
                  dangerouslySetInnerHTML={{
                    __html: sanitize(
                      `<b>Impact Description:</b> ${item.impactDescription}` ||
                        item.name
                    ),
                  }}
                  style={{ whiteSpace: 'break-spaces' }}
                />
              </div>
              {item.contributionDescription && (
                <div className="flex flex-col gap-2">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: sanitize(
                        `<b>Contribution Description:</b> ${item.contributionDescription}`
                      ),
                    }}
                    style={{ whiteSpace: 'break-spaces' }}
                  />
                </div>
              )}
            </div>
          </div>
          {!item.childProjects?.length ? null : (
            <div className="mt-6 mb-10 ">
              <h5 className="pb-2 text-lg border-b border-b-gray-10">
                {item.childProjects.length} projects
              </h5>
              <div className="flex flex-wrap w-full mt-4 gap-7">
                {item.childProjects.map((child) => (
                  <div className="flex w-1/4 gap-4" key={child.id}>
                    <Image
                      alt={item.name}
                      className="w-12 h-12 rounded shrink-0"
                      height={48}
                      src={child.image}
                      width={48}
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
      {/* <footer className="absolute inset-x-0 bottom-0 flex justify-between p-10 pt-6 bg-white font-IBM">
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

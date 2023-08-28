import { ArrowForward } from '@/components/Icon/ArrowForward'
import { PodiumSharp } from '@/components/Icon/PodiumSharp'
import Modal from '@/components/Modal/Modal'
import { useEffect, useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import cn from 'classnames'
import { generateNonOverlappingOrbitCoordinates } from '@/utils/helpers'
import { useRouter } from 'next/router'
import { CollectionPlanet } from '@/components/Galaxy/CollectionPlanet'
import { ColoredGrid } from '@/components/Icon/ColoredGrid'
import { HappySun } from '@/components/Icon/HappySun'
import { SadSun } from '@/components/Icon/SadSun'
import { fetchCollections, getFlowProgress } from '@/utils/flow'
import { PairType } from '@/types/Pairs/Pair'
import { useSession } from '@/context/session'

const PLANET_SIZE = 150
const PROGRESS_BLOCKS = 13

export default function Galaxy() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [cords, setCords] = useState<Array<{ x: number; y: number }>>([])
  const [progress, setProgress] = useState(0)
  const [collections, setCollections] = useState<PairType[]>([])
  const { flowStatus } = useSession()

  useEffect(() => {
    if (
      (!flowStatus.impact || !flowStatus.expertise) &&
      flowStatus.checkpoint.type !== 'initial'
    ) {
      setOpen(true)
    }
  }, [flowStatus])

  useEffect(() => {
    getFlowProgress()
      .then(setProgress)
      .catch((err) => console.log(err))
    fetchCollections()
      .then((data) => setCollections(data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setCords(
        generateNonOverlappingOrbitCoordinates(5, 2.2)
          .concat(generateNonOverlappingOrbitCoordinates(10, 1.2))
          .concat(generateNonOverlappingOrbitCoordinates(20, 1.3))
      )
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="overflow-hidden">
      <ColoredGrid className="absolute max-h-screen-content w-full text-white" />
      <TransformWrapper centerOnInit initialScale={2.5}>
        <TransformComponent>
          <div
            className="flex w-screen items-center justify-center overflow-hidden p-10"
            style={{ height: 'calc(100vh - 60px - 120px)' }}>
            <div
              className="relative flex shrink-0 items-center justify-center"
              style={{
                width: '200vw',
                height: '200vh',
                transform: 'scale(.3)',
              }}>
              <div className="relative flex h-screen w-screen items-center justify-center ">
                {cords.length &&
                  collections.map((collection, idx) => {
                    const { x, y } = cords[idx]

                    return (
                      <div
                        className={`absolute flex ${collection.locked ? "cursor-default" : "cursor-pointer"} items-center justify-center`}
                        key={collection.id}
                        onClick={() =>
                          !collection.locked &&
                          router.push(
                            `/${
                              collection.hasSubcollections ? 'galaxy' : 'poll'
                            }/${collection.id}`
                          )
                        }
                        style={{
                          width: `${PLANET_SIZE}px`,
                          height: `${PLANET_SIZE}px`,
                          left: `${x - PLANET_SIZE / 2}px`,
                          top: `${y - PLANET_SIZE / 2}px`,
                        }}>
                        <CollectionPlanet
                          locked={collection.locked}
                          name={collection.name}
                        />
                      </div>
                    )
                  })}
                {open ? <SadSun /> : <HappySun />}
              </div>
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper>

      <Modal className="mt-80" isOpen={open} onClose={() => setOpen(false)}>
        <div className="flex max-w-lg flex-col gap-4 font-IBM text-black">
          <p className="text-lg font-bold">Starting the journey!</p>
          <p className="text-xl">
            Just two simple question to create more personalized voting
            experience for you.
          </p>
          <button
            className="mx-auto mt-4 flex h-[50px] min-w-fit items-center justify-center rounded-full border border-black bg-black p-2 px-8 text-sm text-white"
            onClick={() => {
              router.push('/start-journey')
            }}>
            {"Let's start"} <ArrowForward className="ml-1" />
          </button>
        </div>
      </Modal>
      <div className="fixed bottom-0 flex h-[113px]  w-full  items-center justify-between rounded-t-[25%] bg-gray-10 px-48 text-lg text-black">
        <div className="flex items-center">
          <h4 className="font-IBM text-3xl font-bold">Governance Orbit</h4>
          <span className="ml-5 font-medium">{progress}% voted</span>
          <div className="-mt-1 ml-4 flex items-center">
            <span className="text-3xl">[</span>
            <div className="flex items-center gap-2 p-2">
              {Array(PROGRESS_BLOCKS)
                .fill(Infinity)
                .map((_, idx) => (
                  <div
                    className={cn('h-3 w-[2px] bg-red', {
                      'h-[6px] bg-black opacity-10':
                        idx > (progress * PROGRESS_BLOCKS) / 100,
                    })}
                    key={idx}
                  />
                ))}
            </div>

            <span className="text-3xl">]</span>
          </div>
        </div>
        <button
          className="flex items-center gap-2  whitespace-nowrap rounded-xl border-6 border-gray-30 bg-gray-50 px-6 py-2 text-lg"
          onClick={() => router.push('/poll/root/ranking')}>
          Check votes
          <PodiumSharp />
        </button>
      </div>
    </div>
  )
}

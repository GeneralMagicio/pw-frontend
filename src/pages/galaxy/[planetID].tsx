import { ArrowForward } from '@/components/Icon/ArrowForward'
import { PodiumSharp } from '@/components/Icon/PodiumSharp'
import Modal from '@/components/Modal/Modal'
import { useEffect, useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import cn from 'classnames'
import { generateNonOverlappingOrbitCoordinates } from '@/utils/helpers'
import { ArrowBackward } from '@/components/Icon/ArrowBackward'
import { useRouter } from 'next/router'
import { ProjectPlanet } from '@/components/Galaxy/ProjectPlanet'
import { ColoredGrid } from '@/components/Icon/ColoredGrid'
import { fetchCollections } from '@/utils/flow'
import { PairType } from '@/types/Pairs/Pair'

const PLANET_SIZE = 150

export default function AGalaxy() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [cords, setCords] = useState<Array<{ x: number; y: number }>>([])
  const [collections, setCollections] = useState<PairType[]>([])

  useEffect(() => {
    if (router.query.planetID)
      fetchCollections(String(router.query.planetID))
        .then(setCollections)
        .catch((err) => console.log(err))
  }, [router.query.planetID])

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
    <div className="relative overflow-hidden">
      <ColoredGrid className="absolute max-h-screen-content w-full text-white" />
      <button
        className="absolute left-10 top-10 z-50 flex  items-center gap-2 whitespace-nowrap  rounded-xl border-6 border-gray-100 bg-white p-2 px-6 text-lg text-black"
        onClick={() => {
          router.back()
        }}>
        <ArrowBackward className="text-black" />
        <span>Go Back</span>
      </button>
      <TransformWrapper centerOnInit centerZoomedOut initialScale={2.5}>
        <TransformComponent>
          <div
            className=" flex w-screen items-center justify-center overflow-hidden"
            style={{ height: 'calc(100vh - 60px - 120px)' }}>
            <div
              className="relative flex shrink-0 items-center justify-center"
              style={{
                width: '200vw',
                height: '200vh',
                transform: 'scale(.2)',
              }}>
              <div className="relative flex h-screen w-screen items-center justify-center ">
                {cords.length &&
                  collections.map((collection, idx) => {
                    const { x, y } = cords[idx]
                    const isRight = x >= window.innerWidth / 2

                    return (
                      <div
                        className="absolute h-[100px] w-[100px] cursor-pointer"
                        key={x + y}
                        onClick={() =>
                          !collection.locked && collection.voted
                            ? router.push(`poll/${collection.id}/ranking`)
                            : router.push(
                                `/${
                                  collection.hasSubcollections
                                    ? 'galaxy'
                                    : 'poll'
                                }/${collection.id}`
                              )
                        }
                        style={{
                          width: `${PLANET_SIZE}px`,
                          height: `${PLANET_SIZE}px`,
                          left: `${x - PLANET_SIZE / 2}px`,
                          top: `${y - PLANET_SIZE / 2}px`,
                        }}>
                        <ProjectPlanet isRight={isRight} project={collection} />
                      </div>
                    )
                  })}
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
            onClick={() => {}}>
            {"Let's start"} <ArrowForward className="ml-1" />
          </button>
        </div>
      </Modal>
    </div>
  )
}

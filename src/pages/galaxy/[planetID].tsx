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
import { fetchCollections, fetchCompositeProjects } from '@/utils/flow'
import { PairType } from '@/types/Pairs/Pair'
import { PlanetSub } from '@/components/Icon/PlanetSub'
import { fetchPairs } from '@/utils/poll'
import { NewSectionsModal } from '@/components/Journey/NewSectionsModal'
import { GalaxyCenterPlanet } from '@/components/Galaxy/GalaxyCenterPlanet'
import { axiosInstance } from '@/utils/axiosInstance'

const PLANET_SIZE = 150

export default function AGalaxy() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [cords, setCords] = useState<Array<{ x: number; y: number }>>([])
  const [collections, setCollections] = useState<PairType[]>([])
  const [status, setStatus] = useState<{ finished: boolean; title: string }>({
    finished: false,
    title: '',
  })
  // const [showNewSectionsModal, setShowNewSectionsModal] = useState(false)

  useEffect(() => {
    const main = async () => {
      if (router.query.planetID) {
        const [collections, compositeProjects] = await Promise.all([
          fetchCollections(String(router.query.planetID)),
          fetchCompositeProjects(String(router.query.planetID)),
        ])

        // @ts-ignore
        setCollections([
          ...collections.map((item) => ({ ...item, type: 'collection' })),
          ...compositeProjects.map((item) => ({ ...item, type: 'super project' })),
        ])
        // setCollections([
        //   ...collections.map((item) => ({...item, type: "project"})),
        //  ...compositeProjects.map((item) => ({...item, type: "super project"}))
        // ])
      }
    }

    main()
  }, [router.query.planetID])

  useEffect(() => {
    const func = async () => {
      if (router.query.planetID) {
        const res = await axiosInstance.get(`/collection/${Number(router.query.planetID)}`)
        const c = res.data
        setStatus({
          finished: c.finished ?? true,
          title: c.collection.name || ""
        })
      }
    }

    func()
  }, [router.query.planetID])

  useEffect(() => {
    const handleResize = () => {
      setCords(
        generateNonOverlappingOrbitCoordinates(5, 2.5)
          .concat(generateNonOverlappingOrbitCoordinates(10, 1.2))
          .concat(generateNonOverlappingOrbitCoordinates(20, 1.3))
      )
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // useEffect(() => {
  //   const allCollectionsUnlockedUnstarted = collections.every(
  //     (collection) => !collection.locked && !collection.started
  //   )

  //   if (collections.length > 0 && allCollectionsUnlockedUnstarted)
  //     setShowNewSectionsModal(true)
  //   else setShowNewSectionsModal(false)
  // }, [collections])

  const handleClick = (collection: PairType) => () => {
    if (collection.locked) return;
    if (collection.type === 'collection')
      return collection.finished
          ? router.replace(`/poll/${collection.id}/ranking`)
          : router.push(
              `/${collection.hasSubcollections ? 'galaxy' : 'poll'}/${
                collection.id
              }`
            )
    else if (collection.type === 'super project')
      return collection.finished
          ? router.replace(`/poll/${collection.id}/ranking?type=super`)
          : router.push(`/poll/${collection.id}?type=super`)
  }

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
      {/* {showNewSectionsModal && (
        <NewSectionsModal
          isOpen={true}
          onClose={() => {
            setShowNewSectionsModal(false)
          }}
        />
      )} */}

      <TransformWrapper centerOnInit centerZoomedOut initialScale={4}>
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
                        className={cn("absolute h-[100px] w-[100px] cursor-pointer", {'cursor-auto' : collection.locked})}
                        key={x + y}
                        onClick={handleClick(collection)}
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
                <GalaxyCenterPlanet
                  finished={status.finished}
                  name={status.title}
                  onClick={() =>
                    status.finished
                      ? router.push(`/poll/${router.query.planetID}/ranking`)
                      : router.push(`/poll/${router.query.planetID}`)
                  }
                />
              </div>
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

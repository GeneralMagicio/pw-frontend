import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { useEffect, useRef, useState } from 'react'

import { ArrowBackward } from '@/components/Icon/ArrowBackward'
import { CollectionProgressStatus } from '@/components/Galaxy/types'
import { ColoredGrid } from '@/components/Icon/ColoredGrid'
import { GalaxyCenterPlanet } from '@/components/Galaxy/GalaxyCenterPlanet'
import { LoadingSpinner } from '../../components/Loading/LoadingSpinner'
import { PairType } from '@/types/Pairs/Pair'
import { ProjectPlanet } from '@/components/Galaxy/ProjectPlanet'
import { axiosInstance } from '@/utils/axiosInstance'
import cn from 'classnames'
import { fetchCollections } from '@/utils/flow'
import { generateNonOverlappingOrbitCoordinates } from '@/utils/helpers'
import { useRouter } from 'next/router'
import { useWindowWidth } from '@react-hook/window-size/throttled'
import Button from '@/components/Button'

const PLANET_SIZE = 150

export default function AGalaxy() {
  const router = useRouter()
  // const [open, setOpen] = useState(false)
  const [cords, setCords] = useState<Array<{ x: number; y: number }>>([])
  const [collections, setCollections] = useState<PairType[]>([])
  const [status, setStatus] = useState<{
    progress: CollectionProgressStatus
    title: string
  }>({
    progress: 'Pending',
    title: '',
  })
  // const [showNewSectionsModal, setShowNewSectionsModal] = useState(false)
  const width = useWindowWidth()

  const isPanning = useRef(false)

  useEffect(() => {
    const main = async () => {
      if (router.query.planetID) {
        const collections = await fetchCollections(
          String(router.query.planetID)
        )
        setCollections(
          collections.map((c) => ({
            ...c,
            // @ts-ignore
            type: c.type === 'composite_project' ? 'composite project' : c.type,
          }))
        )
      }
    }

    main()
  }, [router.query.planetID])

  useEffect(() => {
    const func = async () => {
      if (router.query.planetID) {
        const res = await axiosInstance.get(
          `/collection/${Number(router.query.planetID)}`
        )
        const c = res.data
        setStatus({
          progress: c.progress,
          title: c.collection.name || '',
        })
      }
    }

    func()
  }, [router.query.planetID])

  useEffect(() => {
    setCords(
      generateNonOverlappingOrbitCoordinates(
        collections?.length || 6,
        width < 1600 ? 1.8 : 2.5
      )
        .concat(generateNonOverlappingOrbitCoordinates(10, 1.2))
        .concat(generateNonOverlappingOrbitCoordinates(20, 1.3))
    )
  }, [collections, width])

  // useEffect(() => {
  //   const allCollectionsUnlockedUnstarted = collections.every(
  //     (collection) => !collection.locked && !collection.started
  //   )

  //   if (collections.length > 0 && allCollectionsUnlockedUnstarted)
  //     setShowNewSectionsModal(true)
  //   else setShowNewSectionsModal(false)
  // }, [collections])

  const handleClick = (collection: PairType) => () => {
    if (isPanning.current) return
    if (
      collection.progress === 'Pending' ||
      collection.progress === 'WIP' ||
      collection.progress === 'WIP - Threshold'
    ) {
      return router.push(
        `/${collection.hasSubcollections ? 'galaxy' : 'poll'}/${collection.id}`
      )
    }
    return router.push(`/ranking?c=${collection?.id}&from=planet-screen`)
  }

  if (collections.length === 0) {
    return (
      <div
        className="flex w-full items-center justify-center"
        style={{ height: 'calc(100vh - 60px)' }}>
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      <ColoredGrid className="absolute max-h-screen-content w-full text-white" />
      <Button
        className="absolute left-10 top-10 z-20"
        varient="primary"
        size="large"
        onClick={() => {
          router.back()
        }}>
        <ArrowBackward />
        <span>Back</span>
      </Button>

      {/* {showNewSectionsModal && (
        <NewSectionsModal
          isOpen={true}
          onClose={() => {
            setShowNewSectionsModal(false)
          }}
        />
      )} */}

      <TransformWrapper
        centerOnInit
        centerZoomedOut
        initialScale={4}
        onPanning={() => (isPanning.current = true)}
        onPanningStop={() => {
          setTimeout(() => {
            isPanning.current = false
          }, 50)
        }}>
        <TransformComponent>
          <div
            className="flex w-screen items-center justify-center overflow-hidden "
            style={{ height: 'calc(100vh - 60px)' }}>
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
                        className={cn(
                          'absolute h-[100px] w-[100px] cursor-pointer',
                          { 'cursor-auto': collection.locked }
                        )}
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
                  // progress={status.progress}
                  name={status.title}
                  onClick={() => router.push(`/ranking`)}
                />
              </div>
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

import { PodiumSharp } from '@/components/Icon/PodiumSharp'
import { useCallback, useEffect, useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { generateNonOverlappingOrbitCoordinates } from '@/utils/helpers'
import { useRouter } from 'next/router'
import { CollectionPlanet } from '@/components/Galaxy/CollectionPlanet'
import { ColoredGrid } from '@/components/Icon/ColoredGrid'
import { HappySun } from '@/components/Icon/HappySun'
import { SadSun } from '@/components/Icon/SadSun'
import { fetchCollections } from '@/utils/flow'
import { PairType } from '@/types/Pairs/Pair'
import { useSession } from '@/context/session'
import { HelpModal } from '@/components/Journey/HelpModal'
import { MainQuestionsModal } from '@/components/Galaxy/MainQuestionsModal'
import { NewSectionsModal } from '@/components/Journey/NewSectionsModal'
import { CustomizeExperienceModal } from '@/components/Journey/CustomizeExperienceModal'

const PLANET_SIZE = 150

export default function Galaxy() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [cords, setCords] = useState<Array<{ x: number; y: number }>>([])
  const [collections, setCollections] = useState<PairType[]>([])
  const [showHelpModal, setShowHelpModal] = useState(false)
  // const [showNewSectionsModal, setShowNewSectionsModal] = useState(false)
  const [showCustomizeModal, setShowCustomizeModal] = useState(true)
  const { flowStatus, updateFlowStatus } = useSession()

  useEffect(() => {
    const func = async () => {
      const status = await updateFlowStatus()
      if (
        (!status.impact || !status.expertise) &&
        status.checkpoint.type !== 'initial'
      ) {
        setOpen(true)
      }
    }

    func()
  }, [updateFlowStatus])

  useEffect(() => {
    fetchCollections()
      .then((data) => setCollections(data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setCords(
        generateNonOverlappingOrbitCoordinates(5, 2.2)
          .concat(generateNonOverlappingOrbitCoordinates(10, 1.5))
          .concat(generateNonOverlappingOrbitCoordinates(20, 1.3))
      )
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handlePlanetClick = (collection: PairType) => () => {
    if (collection.locked) return null
    if (
      collection.finished &&
      !collection.hasSubcollections &&
      !collection.hasCompositeProjects
    )
      return router.push(`/poll/${collection.id}/ranking`)
    if (collection.hasSubcollections || collection.hasCompositeProjects) {
      return router.push(`/galaxy/${collection.id}`)
    }
    return router.push(`/poll/${collection.id}`)
  }

  const checkShowHelpModalCondition = useCallback(() => {
    // This is a workaround until the backend returns a better checkpoint response
    const justOnePlanetUnlockedUnstarted =
      collections.filter(
        (collection) => !collection.locked || collection.started
      ).length === 1

    console.log(collections.filter(
      (collection) => !collection.locked || collection.started
    ))

    const bool =
      flowStatus.expertise && flowStatus.impact && justOnePlanetUnlockedUnstarted

    return bool
  }, [collections, flowStatus])

  useEffect(() => {
    setShowHelpModal(checkShowHelpModalCondition())
  }, [checkShowHelpModalCondition])

  // useEffect(() => {
  //   const hasUnlockedUnstartedCollection = collections.some(
  //     (collection) => !collection.locked && !collection.started
  //   )

  //   if (
  //     flowStatus.checkpoint.type !== 'initial' &&
  //     hasUnlockedUnstartedCollection &&
  //     !checkShowHelpModalCondition()
  //   )
  //     setShowNewSectionsModal(true)
  //   else setShowNewSectionsModal(false)
  // }, [collections, showHelpModal, checkShowHelpModalCondition, flowStatus])

  if (
    checkShowHelpModalCondition() &&
    (showCustomizeModal || collections.length === 0)
  ) {
    setTimeout(() => setShowCustomizeModal(false), 3 * 1000)
    return <CustomizeExperienceModal isOpen={true} onClose={() => {}} />
  }

  if (collections.length === 0 || flowStatus.checkpoint.type === 'initial') {
    return
  }

  return (
    <div className="overflow-hidden">
      {/* {showNewSectionsModal && (
        <NewSectionsModal
          isOpen={true}
          onClose={() => {
            setShowNewSectionsModal(false)
          }}
        />
      )} */}
      {showHelpModal && (
        <HelpModal isOpen={true} onClose={() => setShowHelpModal(false)} />
      )}

      <ColoredGrid className="absolute max-h-screen-content w-full text-white" />
      <TransformWrapper centerOnInit initialScale={2.1}>
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
                        className={`absolute flex ${
                          collection.locked
                            ? 'cursor-default'
                            : 'cursor-pointer'
                        } items-center justify-center`}
                        key={collection.id}
                        onClick={handlePlanetClick(collection)}
                        style={{
                          width: `${PLANET_SIZE}px`,
                          height: `${PLANET_SIZE}px`,
                          left: `${x - PLANET_SIZE / 2}px`,
                          top: `${y - PLANET_SIZE / 2}px`,
                        }}>
                        <CollectionPlanet
                          finished={collection.finished}
                          hasCompositeProjects={collection.hasCompositeProjects}
                          hasSubcollections={collection.hasSubcollections}
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

      <MainQuestionsModal isOpen={open} onClose={() => setOpen(false)} />
      <div className="fixed bottom-0 flex h-[113px]  w-full  items-center justify-between rounded-t-[25%] bg-gray-10 px-48 text-lg text-black">
        <button
          className="flex items-center gap-2  whitespace-nowrap rounded-xl border-6 border-gray-30 bg-gray-50 px-6 py-2 text-lg"
          onClick={() => setShowHelpModal(true)}>
          Help
          <PodiumSharp />
        </button>
        <h4 className="font-IBM text-2xl font-bold">Welcome to RertroPGF</h4>
        <button
          className="flex items-center gap-2  whitespace-nowrap rounded-xl border-6 border-gray-30 bg-gray-50 px-6 py-2 text-lg"
          onClick={() => router.push('/ranking')}>
          Check ranks
          <PodiumSharp />
        </button>
      </div>
    </div>
  )
}

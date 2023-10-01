import { PodiumSharp } from '@/components/Icon/PodiumSharp'
import { useCallback, useEffect, useState } from 'react'
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
import { HelpModal } from '@/components/Journey/HelpModal'
import { MainQuestionsModal } from '@/components/Galaxy/MainQuestionsModal'
import { NewSectionsModal } from '@/components/Journey/NewSectionsModal'
import { CustomizeExperienceModal } from '@/components/Journey/CustomizeExperienceModal'
import { SHOW_HELP_STORAGE_KEY } from '@/utils/contants'

const PLANET_SIZE = 150
const PROGRESS_BLOCKS = 13

export default function Galaxy() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [cords, setCords] = useState<Array<{ x: number; y: number }>>([])
  const [progress, setProgress] = useState(0)
  const [collections, setCollections] = useState<PairType[]>([])
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showNewSectionsModal, setShowNewSectionsModal] = useState(false)
  const [showCustomizeModal, setShowCustomizeModal] = useState(true)
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
    setTimeout(() => setShowCustomizeModal(false), 6.5 * 1000)
  }, [])

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

  const handlePlanetClick = (collection: PairType) => () => {
    if (collection.locked) return null
    if (collection.finished && !collection.hasSubcollections && !collection.hasSuperProjects)
      return router.push(`/poll/${collection.id}/ranking`)
    if (collection.hasSubcollections || collection.hasSuperProjects) {
      return router.push(`/galaxy/${collection.id}`)
    }
    return router.push(`/poll/${collection.id}`)
  }

  const checkShowHelpModalCondition = useCallback(() => {
    // This is a workaround until the backend returns a better checkpoint response
    const onePlanetUnlocked =
      collections.filter((collection) => !collection.locked).length === 1
    const onePlanetUnstarted =
      collections.filter((collection) => !collection.started).length === 1
    const bool =
      flowStatus.expertise &&
      flowStatus.impact &&
      onePlanetUnlocked &&
      onePlanetUnstarted
    return bool
  }, [collections, flowStatus])

  useEffect(() => {
    const shopHelpStorageValue = localStorage.getItem(SHOW_HELP_STORAGE_KEY)
    if (!shopHelpStorageValue) {
      setShowHelpModal(true)
      localStorage.setItem(SHOW_HELP_STORAGE_KEY, 'shown')
    }
  }, [checkShowHelpModalCondition])

  useEffect(() => {
    const hasUnlockedUnstartedCollection = collections.some(
      (collection) => !collection.locked && !collection.started
    )

    if (
      flowStatus.checkpoint.type !== 'initial' &&
      hasUnlockedUnstartedCollection &&
      !checkShowHelpModalCondition()
    )
      setShowNewSectionsModal(true)
    else setShowNewSectionsModal(false)
  }, [collections, checkShowHelpModalCondition, flowStatus])

  if (
    checkShowHelpModalCondition() &&
    (showCustomizeModal || collections.length === 0)
  )
    return <CustomizeExperienceModal isOpen={true} onClose={() => {}} />

  if (collections.length === 0 || flowStatus.checkpoint.type === 'initial')
    return

  return (
    <div className="overflow-hidden">
      {showNewSectionsModal && (
        <NewSectionsModal
          isOpen={true}
          onClose={() => {
            setShowNewSectionsModal(false)
          }}
        />
      )}
      {showHelpModal && (
        <HelpModal isOpen={true} onClose={() => setShowHelpModal(false)} />
      )}

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
                          hasSubcollections={collection.hasSubcollections}
                          hasSuperProjects={collection.hasSuperProjects}
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

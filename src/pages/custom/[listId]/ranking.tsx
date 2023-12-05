import {
  CollectionRanking,
  EditingCollectionRanking,
  ProjectRanking,
  editPercentage,
} from '@/components/Poll/Rankings/edit-logic/edit'
import {
  addAdditionalProperties,
  removeAdditionalProperties,
  resetErrorProperty,
  setErrorProperty,
  setLock,
  validateRanking,
} from '@/components/Poll/Rankings/edit-logic/utils'
import { CollectionProgressStatus } from '../../../components/Galaxy/types'
import { useEffect, useState } from 'react'
import { OverallRanking } from '@/components/Poll/Rankings/OverallRanking'
import { useRouter } from 'next/router'
import { LoadingSpinner } from '@/components/Loading/LoadingSpinner'
import { getRankings } from './RankingConfirmationModal'
import { CustomRankingPageHeader } from './CustomRankingPageHeader'
import { AttestationModal } from './AttestationModal'

export const flattenRankingData = (
  input: CollectionRanking
): ProjectRanking[] => {
  return input.ranking.reduce((acc, item) => {
    if (item.type === 'project') return [...acc, item]
    else return [...acc, ...flattenRankingData(item as CollectionRanking)]
  }, [] as ProjectRanking[])
}

export default function RankingPage() {
  const router = useRouter()
  const [rankings, setRankings] = useState<EditingCollectionRanking>()
  const [tempRankings, setTempRankings] = useState<EditingCollectionRanking>()
  const [editMode, setEditMode] = useState(false)
  const [attestOpen, setAttestOpen] = useState(false)
  const [error, setError] = useState(false)

  const collection = {
    id: -1,
    impactDescription: 'Custom list created by Pairwise',
    name: 'Custom list',
  }

  const listId = router.query.listId as string

  useEffect(() => {
    setEditMode(router.query.edit === 'true' ? true : false)
  }, [router.query.edit])

  const handleBack = () => {
    if (editMode) {
      setEditMode(false)
      setError(false)
      setTempRankings(rankings)
    } else {
      if (router.query.from === 'planet-screen') {
        router.back()
      } else {
        router.push('/galaxy')
      }
    }
  }

  const handleUpdateVotes = async () => {
    if (!rankings || !tempRankings) return
    setEditMode(false)
    setRankings(
      addAdditionalProperties(removeAdditionalProperties(tempRankings))
    )
  }

  const edit =
    (data: EditingCollectionRanking) => (id: number) => (newValue: number) => {
      const newPercentage = newValue / 3e7
      const newRanking = editPercentage(data, id, newPercentage)
      if (validateRanking(newRanking)) {
        setError(false)
        setTempRankings(resetErrorProperty(newRanking))
      } else {
        setError(true)
        setTempRankings(setErrorProperty(data, id, true))
      }
    }

  const changeLockStatus =
    (data: EditingCollectionRanking) => (id: number) => () => {
      setTempRankings(setLock(data, id))
    }

  useEffect(() => {
    const main = async () => {
      const data = await getRankings(listId)
      const temp = {
        id: -2,
        type: 'collection' as const,
        hasRanking: true as const,
        isTopLevel: true as const,
        name: 'Custom list 2',
        progress: 'WIP' as CollectionProgressStatus,
        share: 1,
        RPGF3Id: '-2',
        ranking: [data],
      }
      console.log('data:', data)
      // data.ranking.sort((a, b) => b.share - a.share)
      setRankings(addAdditionalProperties(temp))
    }
    main()
  }, [setRankings, listId])

  useEffect(() => {
    setTempRankings(rankings)
  }, [rankings])

  if (!rankings || !tempRankings) {
    return (
      <div
        className="flex items-center justify-center w-full"
        style={{ height: 'calc(100vh - 60px)' }}>
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <>
      <CustomRankingPageHeader
        editMode={editMode}
        error={error}
        isOverallRanking={true}
        onAttest={() => setAttestOpen(true)}
        onBack={handleBack}
        onEdit={() => {
          setEditMode(!editMode)
        }}
        onUpdate={handleUpdateVotes}
      />
      {attestOpen && rankings && (
        <AttestationModal
          collectionId={collection.id}
          collectionName={collection.name}
          colletionDescription={collection.impactDescription}
          isOpen={attestOpen}
          onClose={() => setAttestOpen(false)}
          // ranking={rankings}
        />
      )}
      {rankings && tempRankings && (
        <OverallRanking
          changeLockStatus={changeLockStatus(tempRankings)}
          data={tempRankings}
          edit={edit(tempRankings)}
          editMode={editMode}
          totalPercentage={tempRankings.share}
        />
      )}
    </>
  )
}

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
import { useEffect, useState } from 'react'
import { LoadingSpinner } from '../../components/Loading/LoadingSpinner'
import { OverallRanking } from '@/components/Poll/Rankings/OverallRanking'
import { RankingPageHeader } from '@/components/Poll/Rankings/OverallRankingRow/OverallRankingHeader'
import { axiosInstance } from '@/utils/axiosInstance'
import { getOverallRanking } from '@/utils/poll'
import { useRouter } from 'next/router'

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
  const [error, setError] = useState(false)
  
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
    await axiosInstance.post('/flow/ranking', {
      shares: removeAdditionalProperties(tempRankings),
    })
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
      const data = await getOverallRanking()
      data.ranking.sort((a, b) => b.share - a.share)
      setRankings(addAdditionalProperties(data))
    }
    main()
  }, [setRankings])

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
      <RankingPageHeader
        editMode={editMode}
        error={error}
        isOverallRanking={true}
        // onAttest={() => {}}
        onBack={handleBack}
        onEdit={() => {
          setEditMode(!editMode)
        }}
        onUpdate={handleUpdateVotes}
      />
      {/* {isOpen && rankings && (
        <AttestationModal
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          ranking={rankings}
        />
      )} */}
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

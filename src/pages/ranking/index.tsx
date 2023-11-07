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
  setLockProperty,
  validateRanking,
} from '@/components/Poll/Rankings/edit-logic/utils'
import { useEffect, useState } from 'react'

import { AttestationModal } from '@/components/Poll/Rankings/OverallRankingRow/AttestationModal'
import { LoadingSpinner } from '../../components/Loading/LoadingSpinner'
import { OverallRanking } from '@/components/Poll/Rankings/OverallRanking'
import { OverallRankingHeader } from '@/components/Poll/Rankings/OverallRankingRow/OverallRankingHeader'
import { axiosInstance } from '@/utils/axiosInstance'
import { getOverallRanking } from '@/utils/poll'
import router from 'next/router'

export const flattenRankingData = (
  input: CollectionRanking
): ProjectRanking[] => {
  return input.ranking.reduce((acc, item) => {
    if (item.type === 'project') return [...acc, item]
    else return [...acc, ...flattenRankingData(item as CollectionRanking)]
  }, [] as ProjectRanking[])
}

export default function RankingPage() {
  const [rankings, setRankings] = useState<EditingCollectionRanking>()
  const [tempRankings, setTempRankings] = useState<EditingCollectionRanking>()
  const [editMode, setEditMode] = useState(false)
  // const [isOpen, setOpen] = useState(false)
  const [error, setError] = useState(false)

  const handleBack = () => {
    if (editMode) {
      setEditMode(false)
      setError(false)
      setTempRankings(rankings)
    } else router.back()
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
      const newRanking = editPercentage(data, id, newValue)
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
      setTempRankings(setLockProperty(data, id))
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
        className="flex w-full items-center justify-center"
        style={{ height: 'calc(100vh - 60px)' }}>
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <>
      <OverallRankingHeader
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

import { OverallRanking } from '@/components/Poll/Rankings/OverallRanking'
import { AttestationModal } from '@/components/Poll/Rankings/OverallRankingRow/AttestationModal'
import { OverallRankingHeader } from '@/components/Poll/Rankings/OverallRankingRow/OverallRankingHeader'
import {
  CollectionRanking,
  EditingCollectionRanking,
  ProjectRanking,
  editPercentage,
} from '@/components/Poll/Rankings/edit-logic/edit'
import {
  validateRanking,
  resetErrorProperty,
  setErrorProperty,
  addAdditionalProperties,
  setLockProperty,
  removeAdditionalProperties,
} from '@/components/Poll/Rankings/edit-logic/utils'
import { axiosInstance } from '@/utils/axiosInstance'
import { getOverallRanking } from '@/utils/poll'
import router from 'next/router'
import { useEffect, useState } from 'react'

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
  const [isOpen, setOpen] = useState(false)
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
    setRankings(addAdditionalProperties(removeAdditionalProperties(tempRankings)))
    await axiosInstance.post('/flow/ranking', {
      collectionId: null,
      ranking: JSON.stringify(removeAdditionalProperties(tempRankings)),
    })
  }

  const edit =
    (data: EditingCollectionRanking) =>
    (id: number) =>
    (newValue: number) => {
      const newRanking = editPercentage(data, id, newValue)
      if (validateRanking(newRanking)) {
        setError(false)
        console.log("nr:", newRanking)
        setTempRankings(resetErrorProperty(newRanking))
      } else {
        setError(true)
        setTempRankings(setErrorProperty(data, id))
      }
    }

  const changeLockStatus =
    (data: EditingCollectionRanking) => (id: number) => () => {
        setTempRankings(setLockProperty(data, id))
    }
  
  useEffect(() => {
    console.log("tr:", tempRankings)
  }, [tempRankings])

  useEffect(() => {
    const main = async () => {
      const data = await getOverallRanking()
      data.ranking.sort((a, b) => b.share - a.share)
      console.log("with additinal:", addAdditionalProperties(data))
      setRankings(addAdditionalProperties(data))
    }
    main()
  }, [setRankings])

  useEffect(() => {
    setTempRankings(rankings)
  }, [rankings])

  return (
    <>
      <OverallRankingHeader
        editMode={editMode}
        error={error}
        onAttest={() => {
          setOpen(true)
        }}
        onBack={handleBack}
        onEdit={() => {
          setEditMode(!editMode)
        }}
        onUpdate={handleUpdateVotes}
      />
      {isOpen && (
        <AttestationModal
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          ranking={rankings ? flattenRankingData(rankings) : []}
        />
      )}
      {rankings && tempRankings && (
        <OverallRanking
          changeLockStatus={changeLockStatus(tempRankings)}
          data={tempRankings}
          edit={edit(tempRankings)}
          editMode={editMode}
        />
      )}
    </>
  )
}

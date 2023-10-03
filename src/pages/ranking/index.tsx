import {
  OverallRanking,
} from '@/components/Poll/Rankings/OverallRanking'
import { AttestationModal } from '@/components/Poll/Rankings/OverallRankingRow/AttestationModal'
import { OverallRankingHeader } from '@/components/Poll/Rankings/OverallRankingRow/OverallRankingHeader'
import { changePercentage } from '@/components/Poll/Rankings/edit-logic/project-editing'

import { changeCollectionPercentage } from '@/components/Poll/Rankings/edit-logic/collection-editing'
import { validateRanking, resetErrorProperty, setErrorProperty, addLockedProperty, changeCollectionLockStatus, changeProjectLockStatus, removeAddedProperties } from '@/components/Poll/Rankings/edit-logic/utils'
import {
  EditingOverallRankingType,
  OverallRankingType,
  Rank,
} from '@/types/Ranking/index'
import { axiosInstance } from '@/utils/axiosInstance'
import { getOverallRanking } from '@/utils/poll'
import router from 'next/router'
import { useEffect, useState } from 'react'

export const flattenRankingData = (input: OverallRankingType): Rank[] => {
  return input.ranking.reduce((acc, item) => {
    if (item.type === "project") return [...acc, item]
    else return [...acc, ...flattenRankingData(item as OverallRankingType)]
  }, [] as Rank[])
}

export default function RankingPage() {
  const [rankings, setRankings] = useState<EditingOverallRankingType[]>()
  const [tempRankings, setTempRankings] =
    useState<EditingOverallRankingType[]>()
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
    setRankings(addLockedProperty(removeAddedProperties(tempRankings)))
    await axiosInstance.post('/flow/ranking', {
      collectionId: null,
      ranking: JSON.stringify(removeAddedProperties(tempRankings))
    })
  }

  const edit =
    (data: EditingOverallRankingType[]) =>
    (type: 'project' | 'collection', id: number) =>
    (newValue: number) => {
      if (type === 'collection') {
        const newRanking = changeCollectionPercentage(data, id, newValue)
        if (validateRanking(newRanking)) {
          setError(false)
          setTempRankings(resetErrorProperty(newRanking))
        } else {
          setError(true)
          setTempRankings(setErrorProperty(data, 'collection', id, true))
        }
      } else if (type === 'project') {
        const newRanking = changePercentage(data, id, newValue)
        if (validateRanking(newRanking)) {
          setError(false)
          setTempRankings(resetErrorProperty(newRanking))
        } else {
          setError(true)
          setTempRankings(setErrorProperty(data, 'project', id, true))
        }
      }
    }

  const changeLockStatus =
    (data: EditingOverallRankingType[]) =>
    (id: number, type: 'project' | 'collection') =>
    () => {
      if (type === 'project') {
        setTempRankings(changeProjectLockStatus(data, id))
      } else if (type === 'collection')
        setTempRankings(changeCollectionLockStatus(data, id))
    }

  useEffect(() => {
    const main = async () => {
      const data = await getOverallRanking()
      const ranking = addLockedProperty(data.sort((a, b) => b.share - a.share))
      console.log("added locked:", ranking)
      setRankings(ranking)
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
          ranking={rankings ? flattenRankingData({rankings} as any) : []}
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
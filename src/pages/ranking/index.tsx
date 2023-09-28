import {
  OverallRanking,
  hasSubcollections,
} from '@/components/Poll/Rankings/OverallRanking'
import { AttestationModal } from '@/components/Poll/Rankings/OverallRankingRow/AttestationModal'
import { OverallRankingHeader } from '@/components/Poll/Rankings/OverallRankingRow/OverallRankingHeader'
import { changePercentage } from '@/components/Poll/Rankings/edit-logic'

import { changeCollectionPercentage } from '@/components/Poll/Rankings/edit-logic/collection-editing'
import { isEditingRank, validateRanking, resetErrorProperty, setErrorProperty, addLockedProperty, changeCollectionLockStatus, changeProjectLockStatus } from '@/components/Poll/Rankings/edit-logic/utils'
import {
  EditingOverallRankingType,
  OverallRankingType,
  Rank,
} from '@/types/Ranking/index'
import { axiosInstance } from '@/utils/axiosInstance'
import { getLastTimestamp, getOverallRanking } from '@/utils/poll'
import cloneDeep from 'lodash.clonedeep'
import router from 'next/router'
import { useEffect, useState } from 'react'

export const flattenRankingData = (ranking: OverallRankingType[]): Rank[] => {
  return ranking.reduce((acc, item) => {
    if (hasSubcollections(item.ranking)) {
      return [...acc, ...flattenRankingData(item.ranking)]
    } else return [...acc, ...item.ranking]
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
    if (!rankings) return
    setEditMode(false)
    setRankings(tempRankings)
    await axiosInstance.post('/flow/ranking', {
      collectionId: null,
      ranking: JSON.stringify(tempRankings)
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
      setRankings(
        addLockedProperty(data.sort((a, b) => b.votingPower - a.votingPower))
      )
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
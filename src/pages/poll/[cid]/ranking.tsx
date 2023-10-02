import { getRankings, getCompositeProjectRankings } from '@/utils/poll'
import { useEffect, useState } from 'react'
import { OverallRanking } from '@/components/Poll/Rankings/OverallRanking'
import { OverallRankingHeader } from '@/components/Poll/Rankings/OverallRankingRow/OverallRankingHeader'
import { changePercentage } from '@/components/Poll/Rankings/edit-logic'
import {
  validateRanking,
  resetErrorProperty,
  setErrorProperty,
  addLockedProperty,
  changeProjectLockStatus,
} from '@/components/Poll/Rankings/edit-logic/utils'
import { EditingOverallRankingType, RankingResponse } from '@/types/Ranking/index'
import { useRouter } from 'next/router'
import { FinishVoteModal } from '@/components/FinishVoteModal'
import Modal from '@/components/Modal/Modal'

export default function RankingPage() {
  const [rankings, setRankings] = useState<EditingOverallRankingType[]>()
  const [tempRankings, setTempRankings] =
    useState<EditingOverallRankingType[]>()
  const [editMode, setEditMode] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()
  const type = router.query.type

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
    //   collectionId: rankings[0].id,
    //   ranking: JSON.stringify(tempRankings),
    // })
  }

  const edit =
    (data: EditingOverallRankingType[]) =>
    (type: 'project' | 'collection', id: number) =>
    (newValue: number) => {
      if (type === 'project') {
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
      }
    }

  useEffect(() => {
    const main = async () => {
      if (router.query.cid) {
        let data : RankingResponse;
        if (type === "super")  data = await getCompositeProjectRankings(String(router.query.cid))
        else data = await getRankings(String(router.query.cid))
        setRankings(
          addLockedProperty([
            {
              collectionTitle: data.collectionTitle,
              id: 50,
              share: 1,
              expanded: true,
              locked: true,
              ranking: data.ranking.map((item) => ({
                id: item.project.id,
                share: item.share,
                name: item.project.name,
              })),
            },
          ])
        )
      }
    }
    main()
  }, [setRankings, router.query.cid, type])

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
      <Modal
        className="mb-96 bg-white"
        isOpen={open}
        onClose={() => setOpen(false)}>
        <FinishVoteModal />
      </Modal>
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

import { getRankings, getCompositeProjectRankings } from '@/utils/poll'
import { useEffect, useState } from 'react'
import { OverallRanking } from '@/components/Poll/Rankings/OverallRanking'
import { OverallRankingHeader } from '@/components/Poll/Rankings/OverallRankingRow/OverallRankingHeader'
// import { changePercentage } from '@/components/Poll/Rankings/edit-logic/project-editing'
import {
  validateRanking,
  resetErrorProperty,
  setErrorProperty,
  addAdditionalProperties,
  setLockProperty,
} from '@/components/Poll/Rankings/edit-logic/utils'
import { RankingResponse } from '@/types/Ranking/index'
import { useRouter } from 'next/router'
import { FinishVoteModal } from '@/components/FinishVoteModal'
import Modal from '@/components/Modal/Modal'
import { EditingCollectionRanking, editPercentage } from '@/components/Poll/Rankings/edit-logic/edit'

export default function RankingPage() {
  const [rankings, setRankings] = useState<EditingCollectionRanking>()
  const [tempRankings, setTempRankings] =
    useState<EditingCollectionRanking>()
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
    (data: EditingCollectionRanking) =>
    (id: number) =>
    (newValue: number) => {
      // if (type === 'project') {
      const newRanking = editPercentage(data, id, newValue)
      if (validateRanking(newRanking)) {
        setError(false)
        setTempRankings(resetErrorProperty(newRanking))
      } else {
        setError(true)
        setTempRankings(setErrorProperty(data, id))
      }
    }

  // const obj = 

  const changeLockStatus =
    (data: EditingCollectionRanking) =>
    (id: number) =>
    () => {
      setTempRankings(setLockProperty(data, id))
    }

  useEffect(() => {
    const main = async () => {
      if (router.query.cid) {
        const data = await getRankings(String(router.query.cid))
        setRankings({
          collectionTitle: data.collectionTitle,
          id: 50,
          share: data.votingPower,
          expanded: true,
          locked: true,
          type: "collection",
          ranking: data.ranking.map((item) => ({
            id: item.project.id,
            share: item.share,
            name: item.project.name,
            type: "project",
          }))
        } as EditingCollectionRanking)
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
        onAttest={() => {}}
        onBack={handleBack}
        onDone={() => {
          setOpen(true)
        }}
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

import { getRankings, getCollection } from '@/utils/poll'
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
  removeAdditionalProperties,
} from '@/components/Poll/Rankings/edit-logic/utils'
import { useRouter } from 'next/router'
import { FinishVoteModal } from '@/components/FinishVoteModal'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Modal from '@/components/Modal/Modal'
import {
  EditingCollectionRanking,
  editPercentage,
} from '@/components/Poll/Rankings/edit-logic/edit'
import { axiosInstance } from '@/utils/axiosInstance'
import { AttestationModal } from '@/components/Poll/Rankings/OverallRankingRow/AttestationModal'
import { PairType } from '@/types/Pairs/Pair'

export default function RankingPage({
  isMoon,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [rankings, setRankings] = useState<EditingCollectionRanking>()
  const [tempRankings, setTempRankings] = useState<EditingCollectionRanking>()
  const [collection, setCollection] = useState<PairType>()
  const [editMode, setEditMode] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()
  // const type = router.query.type

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
    setRankings(tempRankings)
    await axiosInstance.post('/flow/ranking', {
      shares: removeAdditionalProperties(tempRankings),
    })
  }

  const edit =
    (data: EditingCollectionRanking) => (id: number) => (newValue: number) => {
      // if (type === 'project') {
      const newRanking = editPercentage(data, id, newValue)
      if (validateRanking(newRanking)) {
        setError(false)
        setTempRankings(resetErrorProperty(newRanking))
      } else {
        setError(true)
        setTempRankings(setErrorProperty(data, id, true))
      }
    }

  // const obj =

  const changeLockStatus =
    (data: EditingCollectionRanking) => (id: number) => () => {
      setTempRankings(setLockProperty(data, id))
    }

  useEffect(() => {
    const main = async () => {
      if (router.query.cid) {
        const [data, collection] = await Promise.all([
          getRankings(String(router.query.cid)),
          getCollection(Number(router.query.cid))
        ])
        // console.log("data:", data)
        // console.log("data.ranking:", data.)
        setCollection(collection)
        setRankings(addAdditionalProperties(data))
      }
    }
    main()
  }, [setRankings, router.query.cid])

  useEffect(() => {
    setTempRankings(rankings)
  }, [rankings])

  return (
    <>
      <OverallRankingHeader
        editMode={editMode}
        error={error}
        isOverallRanking={false}
        onAttest={isMoon ? () => setOpen(true) : undefined}
        onBack={handleBack}
        onDone={!isMoon ? () => setOpen(true) : undefined}
        onEdit={() => {
          setEditMode(!editMode)
        }}
        onUpdate={handleUpdateVotes}
      />
      {isMoon && rankings && collection && (
        <AttestationModal
          collectionId={collection.id}
          collectionName={collection.name}
          colletionDescription={collection.impactDescription}
          isOpen={open}
          onClose={() => setOpen(false)}
          ranking={rankings}
        />
      )}
      {!isMoon && <Modal
        className="mb-96 bg-white"
        isOpen={open}
        onClose={() => setOpen(false)}>
        <FinishVoteModal />
      </Modal>}

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

export const getServerSideProps = (async (context) => {
  const cid = context.params?.cid

  if (!cid) return { props: { isMoon: false } }

  const res = await axiosInstance.get<boolean>('/flow/isMoon', {
    params: {
      cid,
    },
  })

  const isMoon = res.data
  return { props: { isMoon } }
}) satisfies GetServerSideProps<{
  isMoon: boolean
}>

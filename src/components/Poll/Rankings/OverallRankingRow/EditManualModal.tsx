import Modal from '@/components/Modal/Modal'
import { finishCollections } from '@/utils/poll'

interface Props {
  collectionId?: number
  isOpen: boolean
  onClose: () => void
}

export const EditManualModal: React.FC<Props> = ({
  collectionId,
  isOpen,
  onClose,
}) => {
  const handleOkClick = async () => {
    if (!collectionId) return
    await finishCollections(collectionId)
    window.location.href = `/ranking?c=${collectionId}&edit=true`
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-5 w-96 font-IBM">
        <p className="text-2xl font-bold">Warning</p>
        <p>
          After making manual edits to a category you can&apos;t do any more
          pairwise rankings for that category.
        </p>
        <div className="flex justify-center w-full gap-5">
          <button
            className={
              'flex h-12 w-fit items-center self-center rounded-full border border-black px-8 py-2'
            }
            onClick={onClose}>
            No thanks
          </button>
          <button
            className={
              'flex h-12 w-fit items-center self-center rounded-full bg-black px-8 py-2  text-white'
            }
            onClick={handleOkClick}>
            Edit manually
          </button>
        </div>
      </div>
    </Modal>
  )
}

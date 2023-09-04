import Modal from '../Modal/Modal'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const NewSectionsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal className="bg-white/[.9]" isOpen={isOpen} onClose={onClose}>
      <div className="flex max-w-2xl flex-col gap-8 p-2 font-IBM text-black">
        <h3 className="text-3xl font-bold">New Sections Unlocked!</h3>
        <p className="text-xl font-bold leading-10">
          Congratulations! <br/> Your vote on the this section has unlocked additional
          sections for exploration. Discover new sections and sub-collections
          that await your insights and votes.
        </p>
        <div className="mt-4 flex items-center justify-center">
          <button
            className="flex h-[50px] items-center justify-center rounded-full border border-black bg-black p-2 px-8 text-sm text-white"
            onClick={onClose}>
            {'Continue Exploring'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

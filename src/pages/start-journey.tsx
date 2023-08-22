import Modal from '@/components/Modal/Modal'
import { StartJourneyModal } from '@/components/StartJourneyModal'

export default function StartJourney() {
  return (
    <>
      <Modal isOpen onClose={() => {}}>
        <StartJourneyModal />
      </Modal>
    </>
  )
}

import { Popover } from '@headlessui/react'
import { Dots } from '../../../Icon/Dots'
import React, { useEffect, useState } from 'react'
import { PairType } from '../../../../types/Pairs/Pair'
import { Eye } from '../../../Icon/Eye'
import { VoteModal } from '../../Pair/VoteModal'
import Modal from '@/components/Modal/Modal'
import { getProject } from '../../../../utils/poll'

type ProjectContextMenuProps = {
  project: number
}

export const ProjectContextMenu: React.FC<ProjectContextMenuProps> = ({
  project,
}) => {
  const [showDetails, setShowDetails] = React.useState(false)

  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center">
        <Dots />
      </Popover.Button>

      <Popover.Panel className="absolute z-10 w-56 p-2 bg-white rounded-lg -left-48 drop-shadow-2xl">
        <>
          <div className="flex flex-col gap-2">
            <div
              className="flex items-center justify-between w-full px-2 py-1 rounded-lg whitespace-nowrap hover:bg-gray-100"
              onClick={() => setShowDetails(true)}>
              Details <Eye className="w-5 h-5" />
            </div>
          </div>
        </>
      </Popover.Panel>
      <ProjectModal
        handeClose={() => setShowDetails(false)}
        open={showDetails}
        project={project}
      />
    </Popover>
  )
}

type ProjectModalProps = {
  open: boolean
  project: number
  handeClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  open,
  project,
  handeClose,
}) => {
  const [projectDetails, setProjectDetails] = useState<PairType>()

  useEffect(() => {
    if (!open) return
    ;(async () => {
      setProjectDetails(await getProject(project))
    })()
  }, [project, open])

  if (!projectDetails) return null

  return (
    <Modal isOpen={open} onClose={handeClose}>
      <VoteModal handeClose={handeClose} item={projectDetails} />
    </Modal>
  )
}

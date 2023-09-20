import { FC } from 'react'
import { PadlockLocked } from '@/components/Icon/Padlock-Locked'
import { PadlockUnlocked } from '@/components/Icon/Padlock-Unlocked'

interface Props {
  value: number
  locked: boolean
  focus: boolean
  onChange: (value: number) => void
  onLockClick: () => void;
}

export const EditTextField: FC<Props> = ({
  value,
  locked,
  focus,
  onChange,
  onLockClick
}) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    onChange(+newValue / 100)
  }

  return (
    <div className="flex w-40 items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-[2px]">
      <div className='border-r-2 border-gray-300 pr-1' onClick={onLockClick}>
        {locked ? (
          <PadlockLocked height={25} width={25} />
        ) : (
          <PadlockUnlocked fill="blue" height={25} width={25} />
        )}
      </div>
      <span className="mr-1 text-sm text-red">%</span>
      <input
        className="bg-inherit outline-0"
        id="edit-input"
        onChange={handleChange}
        step={'0.001'}
        type="number"
        value={value}
      />
    </div>
  )
}

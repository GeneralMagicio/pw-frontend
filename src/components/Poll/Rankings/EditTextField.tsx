import { FC, useCallback, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
import { useDebounce } from 'use-debounce'
import { Planet } from '@/components/Icon/Planet'
import { Lock } from '@/components/Icon/Lock'
import { Discord } from '@/components/Icon/Discord'
import { PadlockLocked } from '@/components/Icon/Padlock-Locked'
import { PadlockUnlocked } from '@/components/Icon/Padlock-Unlocked'

interface Props {
  value: number
  locked: boolean
  focus: boolean
  onChange: (value: number) => void
}

export const EditTextField: FC<Props> = ({
  value,
  locked,
  focus,
  onChange,
}) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log('event:', e)
    const newValue = e.currentTarget.value
    onChange(+newValue / 100)
  }

  return (
    <div className="flex w-40 items-center gap-3 rounded-2xl border-2 border-gray-300 px-4 py-1">
      <div className='border-r-2 border-gray-300 pr-2'>
        {locked ? (
          <PadlockLocked height={25} width={25} />
        ) : (
          <PadlockUnlocked height={25} width={25} />
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

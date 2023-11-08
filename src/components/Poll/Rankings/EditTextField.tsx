import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { PadlockLocked } from '@/components/Icon/Padlock-Locked'
import { PadlockUnlocked } from '@/components/Icon/Padlock-Unlocked'
import debounce from 'lodash.debounce'
import cn from 'classnames'
import { EditingCollectionRanking } from './edit-logic/edit'
import { Disabled } from '@/components/Icon/Disabled'

interface Props {
  value: number
  state: EditingCollectionRanking['state']
  error: boolean
  focus: boolean
  onChange: (value: number) => void
  onLockClick: () => void
}

export const EditTextField: FC<Props> = ({
  value,
  state,
  focus,
  onChange,
  onLockClick,
  error,
}) => {
  const [isFocused, setFocus] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // @ts-ignore
    inputRef.current!.value = value
  }, [value])

  const handleChange = useCallback(
    debounce((e: React.FormEvent<HTMLInputElement>) => {
      const newValue = inputRef.current!.value
      if (newValue) onChange(+newValue / 100)
      else {
        onChange(0)
        // @ts-ignore
        inputRef.current!.value = 0
      }
    }, 1000),
    [onChange]
  )

  return (
    <div
      className={cn(
        `flex w-40 items-center gap-2 rounded-lg border ${
          error ? 'border-[#ff0000]' : 'border-gray-300'
        } px-4 py-[2px]`,
        { 'bg-[#1B1E23]/[.1]': state === 'locked' },
        { 'border-gray-500': isFocused && !error }
      )}>
      <div
        className="border-r border-[#1B1E23]/[.2] pr-1"
        onClick={() => {
          if (!error && state !== "disabled") onLockClick()
        }}>
        {state === 'locked' ? (
          <PadlockLocked height={25} width={25} />
        ) : state === 'disabled' ? (
          <Disabled fill="blue" height={25} width={25} />
        ) : (
          <PadlockUnlocked fill="blue" height={25} width={25} />
        )}
      </div>
      <span className="mr-1 text-sm text-red">%</span>
      <input
        className="w-16 bg-transparent outline-0"
        disabled={state !== "normal"}
        id="edit-input"
        onBlur={() => setFocus(false)}
        onChange={handleChange}
        onFocus={() => setFocus(true)}
        ref={inputRef}
        step={'0.001'}
        type="number"
      />
    </div>
  )
}

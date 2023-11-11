import { ChangeEvent, ChangeEventHandler, FC, useCallback, useEffect, useRef, useState } from 'react'
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
    inputRef.current!.value = value.toLocaleString(undefined, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })
  }, [value])
  
  const debounceChange = useCallback(
    
    debounce((newValue: number) => {
      if (newValue) onChange(+newValue)
      else {
        onChange(0)
        // @ts-ignore
        inputRef.current!.value = 0
      }
    }, 1000)
  , [onChange])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value.split('').filter((char) => char !== ',').join(''))
    inputRef.current!.value = newValue.toLocaleString(undefined, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })
    debounceChange(newValue)
  }

  return (
    <div
      className={cn(
        `flex w-48 items-center gap-2 rounded-lg border ${
          error ? 'border-[#ff0000]' : 'border-gray-300'
        } px-4 py-[2px]`,
        { 'bg-[#1B1E23]/[.1]': state === 'locked' || state === 'disabled' },
        { 'border-gray-500': isFocused && !error }
      )}>
      <div
        className="border-r border-[#1B1E23]/[.2] pr-1"
        onClick={() => {
          if (!error && state !== 'disabled') onLockClick()
        }}>
        {state === 'locked' ? (
          <PadlockLocked height={25} width={25} />
        ) : state === 'disabled' ? (
          <PadlockUnlocked fill="blue" height={25} width={25} />
        ) : (
          <PadlockUnlocked fill="blue" height={25} width={25} />
        )}
      </div>
      <input
        className="w-24 bg-transparent outline-0"
        disabled={state !== 'normal'}
        id="edit-input"
        onBlur={() => setFocus(false)}
        onChange={handleChange}
        onFocus={() => setFocus(true)}
        ref={inputRef}
        // pattern="[0-9]+([,][0-9]{1,2})?"
        step={1}
        type="text"
      />
      <span className="ml-1 text-sm text-red">OP</span>
    </div>
  )
}

import { FC, useCallback, useEffect, useRef } from 'react'
import { PadlockLocked } from '@/components/Icon/Padlock-Locked'
import { PadlockUnlocked } from '@/components/Icon/Padlock-Unlocked'
import debounce from 'lodash.debounce'
import cn from 'classnames'

interface Props {
  value: number
  locked: boolean
  error: boolean
  focus: boolean
  onChange: (value: number) => void
  onLockClick: () => void
}

export const EditTextField: FC<Props> = ({
  value,
  locked,
  focus,
  onChange,
  onLockClick,
  error,
}) => {

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // @ts-ignore
    inputRef.current!.value = value
  }, [value])

  const handleChange = useCallback(debounce((e: React.FormEvent<HTMLInputElement>) => {
    const newValue = inputRef.current!.value
    onChange(+newValue / 100)
  }, 1000), [onChange])

  return (
    <div
      className={cn(
        `flex w-40 items-center gap-2 rounded-lg border ${error ? "border-[#ff0000]" : "border-gray-300"} px-4 py-[2px]`,
        { 'bg-[#1B1E23]/[.1]': locked },
      )}>
      <div className="border-r border-[#1B1E23]/[.2] pr-1" onClick={onLockClick}>
        {locked ? (
          <PadlockLocked height={25} width={25} />
        ) : (
          <PadlockUnlocked fill="blue" height={25} width={25} />
        )}
      </div>
      <span className="mr-1 text-sm text-red">%</span>
      <input
        className="w-16 bg-transparent outline-0"
        id="edit-input"
        onChange={handleChange}
        ref={inputRef}
        step={'0.001'}
        type="number"
      />
    </div>
  )
}
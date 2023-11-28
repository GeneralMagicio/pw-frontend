import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { Disabled } from '@/components/Icon/Disabled'
import { EditingCollectionRanking } from './edit-logic/edit'
import { PadlockLocked } from '@/components/Icon/Padlock-Locked'
import { PadlockUnlocked } from '@/components/Icon/Padlock-Unlocked'
import { Warning } from '../../Icon/Warning'
import cn from 'classnames'
import debounce from 'lodash.debounce'
import Tooltip from '@/components/Tooltip'

interface Props {
  value: number
  state: EditingCollectionRanking['state']
  error: boolean
  focus: boolean
  type?: 'project' | 'category'
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
  type = 'category',
}) => {
  const [isFocused, setFocus] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const prevValue = useRef<number>(value)

  useEffect(() => {
    // @ts-ignore
    inputRef.current!.value = value
      ? value.toLocaleString(undefined, {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        })
      : ''
    prevValue.current = value
  }, [value])

  const debounceChange = useCallback(
    debounce((newValue: number) => {
      if (newValue) onChange(+newValue)
      else {
        onChange(0)
        // @ts-ignore
        inputRef.current!.value = ''
      }
    }, 1000),
    [onChange]
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const pattern = /^[0-9,]+$/
    const incomingValue = event.target.value;
    
    const position = event.target.selectionStart
    
    const newValue = Number(
      incomingValue
        .split('')
        .filter((char) => char !== ',')
        .join('')
        )

    const previousValue = prevValue.current.toLocaleString(undefined, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })
    if (!pattern.test(incomingValue)) {
      inputRef.current!.value = previousValue
      return;
    }
    const localizedIncomingValue = newValue.toLocaleString(undefined, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })
    const numOfCommasBefore = previousValue.split('').filter((char) => char === ',').length
    const numOfCommasAfter = localizedIncomingValue.split('').filter((char) => char === ',').length
    const diff = numOfCommasAfter - numOfCommasBefore

    inputRef.current!.value = localizedIncomingValue
    let newPosition = Math.max(0, position! + diff)
    if (incomingValue.length === 1) {
      newPosition = 1 
    }
    inputRef.current!.setSelectionRange(newPosition, newPosition)
    prevValue.current = newValue
    debounceChange(newValue)
  }

  const bgMap: { [key: string]: string } = {
    disabled: 'bg-[#1B1E23]/[.1]',
    locked: 'bg-[#1B1E23]/[.1]',
    normal: 'bg-white/[.7]',
  }

  const titleMap: { [key: string]: string } = {
    disabled: 'Rank more projects in this category to unlock.',
    locked: 'Category is locked, click padlock to unlock.',
  }

  return (
    <>
      <div
        className={cn(
          `flex items-center gap-1 rounded-lg border ${
            error ? 'border-[#ff0000]' : 'border-gray-300'
          } py-1 px-2`,
          bgMap[state],
          { 'border-gray-500': isFocused && !error }
        )}>
        <div
          className="border-r border-[#1B1E23]/[.2] pr-1"
          onClick={() => {
            if (!error && state !== 'disabled') onLockClick()
          }}>
          {state === 'locked' ? (
            <Tooltip text={`Click here to unlock the OP to this ${type}`}>
              <PadlockLocked height={25} width={25} />
            </Tooltip>
          ) : state === 'disabled' ? (
            <Tooltip text={titleMap[state]}>
              <PadlockLocked
                height={25}
                width={25}
                className="text-[#9e9d9d]"
              />
            </Tooltip>
          ) : (
            <Tooltip text={`Click here to lock the OP to this ${type}`}>
              <PadlockUnlocked fill="blue" height={25} width={25} />
            </Tooltip>
          )}
        </div>
        <input
          className={`w-24 bg-transparent text-right outline-0 ${
            error ? 'text-red' : 'text-black'
          } edit-input`}
          name="OP Amount"
          disabled={state !== 'normal'}
          onBlur={() => setFocus(false)}
          onChange={handleChange}
          onFocus={() => setFocus(true)}
          ref={inputRef}
          // pattern="[0-9]+([,][0-9]{1,2})?"
          step={1}
          type="text"
        />
      </div>
      {error ? (
        <div className="flex items-center w-8" title="Invalid value">
          <Warning className="w-4 h-4 ml-1" />
        </div>
      ) : (
        <div className="w-8"></div>
      )}
    </>
  )
}

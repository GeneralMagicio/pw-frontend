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

  useEffect(() => {
    // @ts-ignore
    inputRef.current!.value = value
  }, [value])

  const debounceChange = useCallback(
    debounce((newValue: number) => {
      if (newValue != 0) onChange(+newValue)
      else {
        onChange(0)
        // @ts-ignore
        inputRef.current!.value = ''
      }
    }, 500),
    [onChange]
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value)
    inputRef.current!.value = event.target.value

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
        <div className="flex w-8 items-center" title="Invalid value">
          <Warning className="ml-1 h-4 w-4" />
        </div>
      ) : (
        <div className="w-8"></div>
      )}
    </>
  )
}

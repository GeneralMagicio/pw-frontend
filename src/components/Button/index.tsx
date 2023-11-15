import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Additional custom props can be added here
  varient?: 'primary' | 'secondary' | 'brand'
  size?: 'small' | 'large'
  theme?: 'black'
}

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { children, varient = 'brand', size = 'small', className, theme, ...props },
  ref
) => {
  const isBrand = varient === 'brand'
  const isPrimary = varient === 'primary'
  const isSecondary = varient === 'secondary'
  return (
    <button
      className={twMerge(
        'relative flex h-12  min-w-[120px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-4',
        isBrand && 'bg-black text-white hover:bg-white hover:text-black',
        isSecondary &&
          'border border-black bg-transparent text-black hover:bg-black hover:text-white',
        isPrimary &&
          `m-[6px] rounded-xl ${
            theme === 'black'
              ? 'bg-black text-white hover:before:bg-black-30'
              : 'bg-gray-50 text-black hover:bg-white hover:text-red'
          }  text-lg  before:absolute before:-left-[6px] before:-right-[6px] before:-top-[6px] before:-bottom-[6px] before:-z-10 before:rounded-xl before:bg-gray-50`,
        size === 'small' ? 'h-9' : 'h-12',
        className
      )}
      ref={ref}
      {...props}>
      {children}
    </button>
  )
}

export default forwardRef(Button)

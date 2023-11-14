import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'

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
      className={cn(
        'min-w-[120px] relative whitespace-nowrap  rounded-full px-4 flex gap-2 h-12 items-center justify-center',
        {
          'bg-black text-white hover:bg-white hover:text-black': isBrand,
          'bg-transparent text-black border border-black hover:bg-black hover:text-white':
            isSecondary,
          [`rounded-xl m-[6px] ${
            theme === 'black'
              ? 'bg-black hover:before:bg-black-30 text-white'
              : 'bg-gray-50 text-black hover:bg-white hover:text-red'
          }  text-lg  before:absolute before:-left-[6px] before:-right-[6px] before:-top-[6px] before:-bottom-[6px] before:bg-gray-50 before:-z-10 before:rounded-xl`]:
            isPrimary,
        },
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

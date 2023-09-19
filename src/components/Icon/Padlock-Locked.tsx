/* eslint-disable react/no-unknown-property */
// @ts-nocheck
import { SVGProps } from 'react'

export const PadlockLocked: React.FC<SVGProps<SVGSVGElement>> = ({
  ...props
}) => {
  return (
    <svg
    height="16"
    viewBox="0 0 71 100"
    width="16"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M65.5 45V30c0-16.542-13.458-30-30-30s-30 13.458-30 30v15H0v55h71V45h-5.5zm-52-15c0-12.131 9.869-22 22-22s22 9.869 22 22v15h-44V30z" />
  </svg>
  )
}

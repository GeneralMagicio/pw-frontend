import { SVGProps } from 'react'

export const PauseSharp: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12.5H5.5V3.5H6V12.5Z" stroke="#1C64F2" strokeWidth="2" />
      <path d="M11.5 13.5H9V2.5H11.5V13.5Z" fill="#1C64F2" />
    </svg>
  )
}

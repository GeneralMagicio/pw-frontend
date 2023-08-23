import { SVGProps } from 'react'

export const Check: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="16"
      viewBox="0 0 18 16"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M16.5 2L6 14L1.5 9.5"
        stroke="#1B1E23"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
  )
}

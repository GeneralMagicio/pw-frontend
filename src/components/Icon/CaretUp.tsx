import { SVGProps } from 'react'

export const CaretUp: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M3.5 10.25L8 5.75L12.5 10.25"
        stroke="#1B1E23"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
  )
}

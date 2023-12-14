import { SVGProps } from 'react'

export const CaretDown: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M3.5 5.75L8 10.25L12.5 5.75"
        stroke="#1B1E23"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
  )
}

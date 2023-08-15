import { SVGProps } from 'react'

export const ArrowDown: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M5.25 12.5625L12 19.3125L18.75 12.5625"
        stroke="white"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M12 18.375V4.6875"
        stroke="white"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
  )
}

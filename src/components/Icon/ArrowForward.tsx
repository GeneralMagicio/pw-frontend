import { SVGProps } from 'react'

export const ArrowForward: React.FC<SVGProps<SVGSVGElement>> = ({
  ...props
}) => {
  return (
    <svg
      {...props}
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.75 7L25.75 16L16.75 25"
        stroke="white"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M24.5 16L6.25 16"
        stroke="white"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
  )
}

import { SVGProps } from 'react'

export const ArrowBackward: React.FC<SVGProps<SVGSVGElement>> = ({
  ...props
}) => {
  return (
    <svg
      fill="none"
      height="25"
      viewBox="0 0 25 25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <g id="arrow-back-sharp">
        <path
          d="M11.9375 19.25L5.1875 12.5L11.9375 5.75"
          id="Vector"
          stroke="#1B1E23"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M6.125 12.5H19.8125"
          id="Vector_2"
          stroke="#1B1E23"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
      </g>
    </svg>
  )
}

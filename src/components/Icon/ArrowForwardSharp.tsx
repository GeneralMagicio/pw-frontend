import { SVGProps } from 'react'

export const ArrowForwardSharp: React.FC<SVGProps<SVGSVGElement>> = ({
  ...props
}) => {
  return (
    <svg
      fill="none"
      height="46"
      viewBox="0 0 46 46"
      width="46"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M16.7937 16.1057H29.5216V28.8336"
        stroke="#1B1E23"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M28.6379 16.9896L15.7332 29.8943"
        stroke="#1B1E23"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
  )
}

import { SVGProps } from 'react'

export const Shuffle: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="25"
      viewBox="0 0 24 25"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M18.75 14.75L21 17L18.75 19.25"
        stroke="currentColor"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M18.75 5.75L21 8L18.75 10.25"
        stroke="currentColor"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M3 17H9L11.8125 12.6875"
        stroke="currentColor"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M3 8H9L15 17H19.5"
        stroke="currentColor"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M19.5 8H15L13.5 10.25"
        stroke="currentColor"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
  )
}

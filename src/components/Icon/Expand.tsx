import { SVGProps } from 'react'

export const Expand: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M20.25 15V20.25H15"
        stroke="#1B1E23"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M19.7719 19.7705L14.25 14.25"
        stroke="#1B1E23"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M3.75 9V3.75H9"
        stroke="#1B1E23"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M4.22815 4.22952L9.75002 9.74999"
        stroke="#1B1E23"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M15 3.75H20.25V9"
        stroke="#1B1E23"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M19.7705 4.22812L14.25 9.74999"
        stroke="#1B1E23"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M9 20.25H3.75V15"
        stroke="#1B1E23"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <path
        d="M4.22955 19.7719L9.75002 14.25"
        stroke="#1B1E23"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
  )
}

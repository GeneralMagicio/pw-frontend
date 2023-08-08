import { SVGProps } from 'react'

export const Lock: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="25"
      viewBox="0 0 25 25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M8.78125 10.5H9H9.78125H15.2188H16H16.2188H17H19.75V22.75H5.25V10.5H8H8.78125Z"
        stroke="#1B1E23"
        strokeWidth="2"
      />
    </svg>
  )
}

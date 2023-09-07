import { SVGProps } from 'react'

export const PodiumSharp: React.FC<SVGProps<SVGSVGElement>> = ({
  ...props
}) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 25"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path d="M10 22V3H14V22H10Z" stroke="#1B1E23" strokeWidth="2" />
      <path d="M23.25 6.5H18V20H23.25V6.5Z" fill="#1B1E23" />
      <path d="M6 6.5H0.75V20H6V6.5Z" fill="#1B1E23" />
    </svg>
  )
}

import { SVGProps } from 'react'

export const Close: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="32"
      viewBox="0 0 33 32"
      width="33"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M25.5 9.09313L23.4069 7L16.5 13.9069L9.59313 7L7.5 9.09313L14.4069 16L7.5 22.9069L9.59313 25L16.5 18.0931L23.4069 25L25.5 22.9069L18.5931 16L25.5 9.09313Z"
        fill="currentColor"
      />
    </svg>
  )
}

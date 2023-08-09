import { SVGProps } from 'react'

export const Layers: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="17"
      viewBox="0 0 16 17"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M4 2.5H12V3.5H4V2.5ZM3 4H13V5H3V4ZM14.5 14.5H1.5V5.5H14.5V14.5Z"
        fill="#1B1E23"
      />
    </svg>
  )
}

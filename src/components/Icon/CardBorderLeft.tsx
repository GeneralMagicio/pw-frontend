import { SVGProps } from 'react'

export const CardBorderLeft: React.FC<SVGProps<SVGSVGElement>> = ({
  ...props
}) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 18 486"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M17 1V1C8.16344 1 1 8.16345 1 17V254.25V469.5C1 478.337 8.16344 485.5 17 485.5V485.5"
        stroke="white"
        strokeLinecap="round"
      />
    </svg>
  )
}

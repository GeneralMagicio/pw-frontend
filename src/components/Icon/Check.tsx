import { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
}

export const Check: React.FC<Props> = ({ color, ...props }) => {
  return (
    <svg
      fill="none"
      height="16"
      viewBox="0 0 18 16"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M16.5 2L6 14L1.5 9.5"
        stroke={color || "#1B1E23"}
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </svg>
  )
}

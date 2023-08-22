import { SVGProps } from 'react'

export const PlanetArrorw: React.FC<SVGProps<SVGSVGElement>> = ({
  ...props
}) => {
  return (
    <svg
      fill="none"
      height="40"
      viewBox="0 0 40 40"
      width="40"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M33.8333 15C33.8333 16.4728 35.0272 17.6667 36.5 17.6667C37.9728 17.6667 39.1667 16.4728 39.1667 15C39.1667 13.5272 37.9728 12.3333 36.5 12.3333C35.0272 12.3333 33.8333 13.5272 33.8333 15ZM15.5 15V14.5H15.265L15.115 14.681L15.5 15ZM36.5 14.5H15.5V15.5H36.5V14.5ZM15.115 14.681L0.614989 32.181L1.38501 32.819L15.885 15.319L15.115 14.681Z"
        fill="#1B1E23"
      />
    </svg>
  )
}

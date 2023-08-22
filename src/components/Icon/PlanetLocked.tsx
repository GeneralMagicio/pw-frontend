import { SVGProps } from 'react'

export const PlanetLocked: React.FC<SVGProps<SVGSVGElement>> = ({
  ...props
}) => {
  return (
    <svg
      fill="none"
      height="135"
      viewBox="0 0 135 135"
      width="135"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <g opacity="0.6">
        <circle cx="67.5" cy="67.5" fill="#262A31" opacity="0.4" r="42.5" />
        <circle cx="67.5" cy="67.5" opacity="0.6" r="46" stroke="#262A31" />
        <circle cx="67.5" cy="67.5" fill="#262A31" r="35.5" />
        <path
          d="M55.4992 40C57.8992 34.4 64.4992 32.3333 67.4992 32C53.4505 32 41.3077 40.1606 35.5527 52C45.6063 54 52.4992 47 55.4992 40Z"
          fill="#14171C"
        />
        <path
          d="M67.5 103C87.1061 103 103 87.1057 103 67.4996C102.5 57.9995 89.5 58.9996 79 79.9997C72.5619 92.8759 47.0193 96.4995 32 67.4996C32 87.1057 47.8939 103 67.5 103Z"
          fill="#14171C"
        />
        <circle cx="11.5" cy="97.5" fill="#262A31" opacity="0.7" r="9.5" />
        <circle cx="102" cy="22" fill="#262A31" opacity="0.7" r="3" />
      </g>
    </svg>
  )
}

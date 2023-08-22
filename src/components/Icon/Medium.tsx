import { SVGProps } from 'react'

export const Medium: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="25"
      viewBox="0 0 24 25"
      width="24"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1364_1757)">
        <path
          d="M0 0.816406V24.8164H24V0.816406H0ZM19.9384 6.50272L18.6511 7.73693C18.5967 7.77845 18.5546 7.834 18.5294 7.8976C18.5042 7.96121 18.4967 8.03048 18.5079 8.09799V17.1654C18.4847 17.3027 18.54 17.4422 18.6511 17.5264L19.9079 18.7606V19.0317H13.5858V18.7606L14.8879 17.4964C15.0158 17.3685 15.0158 17.3306 15.0158 17.1354V9.80641L11.3953 19.0017H10.9058L6.69053 9.80641V15.9696C6.65526 16.2285 6.74158 16.4896 6.92368 16.6769L8.61737 18.7311V19.0022H3.81526V18.7311L5.50895 16.6769C5.69 16.489 5.77105 16.2264 5.72737 15.9696V8.84272C5.74737 8.64483 5.67211 8.44904 5.52421 8.31588L4.01895 6.5022V6.23114H8.69316L12.3063 14.1548L15.4826 6.23114H19.9384V6.50272Z"
          fill="#1B1E23"
        />
      </g>
      <defs>
        <clipPath id="clip0_1364_1757">
          <rect
            fill="white"
            height="24"
            transform="translate(0 0.816406)"
            width="24"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
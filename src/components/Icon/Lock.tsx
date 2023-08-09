import { SVGProps } from 'react'

export const Lock: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="25"
      viewBox="0 0 32 32"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M21 12V13H22H26V30H6V13H10H11V12V7C11 5.67392 11.5268 4.40215 12.4645 3.46447C13.4021 2.52678 14.6739 2 16 2C17.3261 2 18.5979 2.52678 19.5355 3.46447C20.4732 4.40215 21 5.67392 21 7V12ZM19.625 13H20.625V12V6.95312C20.625 5.7265 20.1377 4.55011 19.2704 3.68276C18.403 2.8154 17.2266 2.32812 16 2.32812C14.7734 2.32812 13.597 2.8154 12.7296 3.68276C11.8623 4.55011 11.375 5.7265 11.375 6.95312V12V13H12.375H19.625Z"
        stroke="#1B1E23"
        strokeWidth="2"
      />
    </svg>
  )
}

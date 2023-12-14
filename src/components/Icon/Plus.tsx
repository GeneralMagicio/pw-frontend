import { SVGProps } from 'react'

export const Plus: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      {...props}
      fill="none"
      height="1.5em"
      viewBox="0 0 24 24"
      width="1.5em"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12,20a1,1,0,0,1-1-1V13H5a1,1,0,0,1,0-2h6V5a1,1,0,0,1,2,0v6h6a1,1,0,0,1,0,2H13v6A1,1,0,0,1,12,20Z"
        fill="currentColor"
        id="primary"></path>
    </svg>
  )
}

/* eslint-disable react/no-unknown-property */
// @ts-nocheck
import { SVGProps } from 'react'

export const Disabled: React.FC<SVGProps<SVGSVGElement>> = ({
  ...props
}) => {
  return (
    <svg
      fill="#000000"
      width={props.width || "800px"}
      height={props.height || "800px"}
      viewBox="-1 0 19 19"
      xmlns="http://www.w3.org/2000/svg"
      >
      <path d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-5.267 6.274a6.766 6.766 0 0 0 1.756-1.084L3.31 5.177a6.81 6.81 0 0 0 7.84 10.68zm3.624-3.624a6.808 6.808 0 0 0-10.68-7.84l9.596 9.596a6.77 6.77 0 0 0 1.084-1.756z" />
    </svg>
  )
}

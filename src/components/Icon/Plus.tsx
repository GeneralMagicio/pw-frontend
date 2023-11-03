import { SVGProps } from 'react'

export const Plus: React.FC<SVGProps<SVGSVGElement>> = ({
  ...props
}) => {
  return (
    <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M16 7V25" stroke="white" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2"/>
    <path d="M25 16L7 16" stroke="white" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2"/>
    </svg>
     
  )
}

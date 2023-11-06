import { SVGProps } from 'react'

export const LinkSharp: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 25 24"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M9.90594 16.5H7.25C6.05653 16.5 4.91193 16.0259 4.06802 15.182C3.22411 14.3381 2.75 13.1935 2.75 12C2.75 10.8065 3.22411 9.66193 4.06802 8.81802C4.91193 7.97411 6.05653 7.5 7.25 7.5H9.84734"
        stroke="#1B1E23"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M15.1528 7.5H17.7502C18.9437 7.5 20.0882 7.97411 20.9322 8.81802C21.7761 9.66193 22.2502 10.8065 22.2502 12C22.2502 13.1935 21.7761 14.3381 20.9322 15.182C20.0882 16.0259 18.9437 16.5 17.7502 16.5H15.0942"
        stroke="#1B1E23"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M8.42529 12H16.6687"
        stroke="#1B1E23"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

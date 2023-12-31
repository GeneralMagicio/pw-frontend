import { SVGProps } from 'react'

export const CardBorderRight: React.FC<SVGProps<SVGSVGElement>> = ({
  ...props
}) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 83 486"
      width="83"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M1 0.5C0.723858 0.5 0.5 0.723858 0.5 1C0.5 1.27614 0.723858 1.5 1 1.5V0.5ZM77.3333 254.25C77.3333 255.723 78.5272 256.917 80 256.917C81.4728 256.917 82.6667 255.723 82.6667 254.25C82.6667 252.777 81.4728 251.583 80 251.583C78.5272 251.583 77.3333 252.777 77.3333 254.25ZM16.5 17V254.25H17.5V17H16.5ZM16.5 254.25V469.5H17.5V254.25H16.5ZM17 254.75H80V253.75H17V254.75ZM1 486C10.1127 486 17.5 478.613 17.5 469.5H16.5C16.5 478.06 9.56041 485 1 485V486ZM1 1.5C9.56041 1.5 16.5 8.43959 16.5 17H17.5C17.5 7.8873 10.1127 0.5 1 0.5V1.5Z"
        fill="white"
      />
    </svg>
  )
}

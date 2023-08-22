import { SVGProps } from 'react'

export const Planet: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="100"
      viewBox="0 0 100 100"
      width="100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="50" cy="50" fill="#1C64F2" opacity="0.4" r="42" />
      <circle cx="50" cy="50" opacity="0.6" r="45.5" stroke="#1C64F2" />
      <g filter="url(#filter0_d_869_18060)">
        <circle cx="50" cy="50" fill="#1C64F2" r="35" />
      </g>
      <path
        d="M61.5201 22.8636C59.1161 17.3591 52.505 15.3277 49.5 15C63.5723 15 75.7353 23.0215 81.5 34.6591C71.4296 36.625 64.5252 29.7443 61.5201 22.8636Z"
        fill="#403BEB"
      />
      <path
        d="M50 85C30.67 85 15 69.1786 15 49.6619C15.493 40.2051 22.834 39.9244 36.6901 54.6381C65.2817 84.9992 81.5493 66.5844 85 49.6619C85 69.1786 69.33 85 50 85Z"
        fill="#403BEB"
      />
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="90"
          id="filter0_d_869_18060"
          width="90"
          x="5"
          y="5">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.00288194 0 0 0 0 0.132691 0 0 0 0 0.345833 0 0 0 0.56 0"
          />
          <feBlend
            in2="BackgroundImageFix"
            mode="normal"
            result="effect1_dropShadow_869_18060"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_869_18060"
            mode="normal"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

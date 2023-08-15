import { SVGProps } from 'react'

export const Star: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="48"
      viewBox="0 0 48 48"
      width="48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M26.0748 3.80246C25.6133 1.54436 22.3869 1.54436 21.9254 3.80246L18.9432 18.393C18.8866 18.6701 18.67 18.8865 18.393 18.9433L3.80246 21.9253C1.54436 22.387 1.54436 25.6133 3.80248 26.0749L18.393 29.057C18.67 29.1138 18.8866 29.3302 18.9432 29.6073L21.9254 44.1978C22.3869 46.4559 25.6133 46.4559 26.0748 44.1978L29.0571 29.6073C29.1137 29.3302 29.3302 29.1138 29.6072 29.057L44.1978 26.0749C46.4559 25.6133 46.4559 22.387 44.1978 21.9253L29.6072 18.9433C29.3302 18.8865 29.1137 18.6701 29.0571 18.393L26.0748 3.80246Z"
        fill="url(#paint0_radial_1064_1856)"
        stroke="#202327"
      />
      <defs>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(-2.82333 -2.82333) rotate(45) scale(75.8684 41453.8)"
          gradientUnits="userSpaceOnUse"
          id="paint0_radial_1064_1856"
          r="1">
          <stop stopColor="#F3CF00" />
          <stop offset="1" stopColor="#FF0420" />
        </radialGradient>
      </defs>
    </svg>
  )
}

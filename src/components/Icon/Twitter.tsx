import { SVGProps } from 'react'

export const Twitter: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="25"
      viewBox="0 0 24 25"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        clipRule="evenodd"
        d="M23.6 0.816406H0V3.21641V22.4164V24.8164H24V24.4164V0.816406H23.6ZM18.4203 8.30364C19.1174 8.22305 19.7817 8.04438 20.4 7.77887C19.938 8.44671 19.3533 9.03333 18.6794 9.50376C18.6858 9.64682 18.6891 9.79051 18.6891 9.93482C18.6891 14.3386 15.2232 19.4164 8.8834 19.4164C6.93661 19.4164 5.12551 18.8648 3.6 17.9195C3.87008 17.9508 4.14469 17.9664 4.42252 17.9664C6.03785 17.9664 7.52394 17.4335 8.70313 16.5395C7.19506 16.5126 5.92219 15.5487 5.48347 14.2249C5.69346 14.263 5.90991 14.2842 6.13153 14.2842C6.4462 14.2842 6.75117 14.2436 7.03999 14.1674C5.46279 13.8619 4.27521 12.515 4.27521 10.9V10.8582C4.73977 11.1074 5.27154 11.2574 5.83625 11.2749C4.91164 10.6776 4.30364 9.65744 4.30364 8.50168C4.30364 7.89007 4.47357 7.31781 4.76949 6.82552C6.47011 8.84216 9.00939 10.1691 11.8737 10.3078C11.8155 10.0648 11.7845 9.80987 11.7845 9.54874C11.7845 7.70889 13.3275 6.21641 15.231 6.21641C16.2221 6.21641 17.1177 6.62123 17.7463 7.26908C18.532 7.11915 19.2699 6.84176 19.9354 6.46005C19.6783 7.23847 19.1323 7.89132 18.4203 8.30364Z"
        fill="#1B1E23"
        fillRule="evenodd"
      />
    </svg>
  )
}

import { SVGProps } from 'react'
import cn from 'classnames'

export const HappySun: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height="282"
      viewBox="0 0 321 282"
      width="321"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        clipRule="evenodd"
        d="M314.685 139.649C314.006 138.973 211.908 139.088 210.835 139.766C210.342 140.078 210.047 140.894 210.179 141.58C210.412 142.788 212.057 142.827 262.594 142.827C314.611 142.827 314.768 142.823 314.962 141.474C315.069 140.729 314.944 139.908 314.685 139.649ZM313.284 99.5457C312.843 98.2814 310.855 98.5242 301.705 100.961C292.51 103.409 291.834 103.684 291.834 104.976C291.834 107.336 293.569 107.403 301.23 105.344C313.612 102.017 314.071 101.796 313.284 99.5457ZM308.619 179.419C308.344 179.253 304.565 178.166 300.22 177.004C293.441 175.191 292.189 175.023 291.388 175.822C289.476 177.729 291.108 178.792 299.25 180.942C303.648 182.103 307.667 182.892 308.182 182.695C309.161 182.319 309.479 179.938 308.619 179.419ZM293.662 195.096C292.184 193.979 274.613 186.938 273.302 186.938C271.717 186.938 271.062 188.483 272.103 189.769C273.227 191.158 292.322 198.904 293.505 198.451C294.707 197.99 294.802 195.958 293.662 195.096ZM292.72 85.2293C291.707 84.2191 288.769 85.1829 274.218 91.2973C261.204 96.7651 258.897 97.9445 258.716 99.2167C258.595 100.066 258.916 100.87 259.457 101.078C260.367 101.426 290.598 89.3545 292.332 87.9502C293.238 87.2173 293.421 85.9291 292.72 85.2293ZM290.649 215.278C290.021 214.721 279.037 208.234 266.241 200.863C253.444 193.492 235.347 183.058 226.023 177.678C203.743 164.819 204.825 165.354 203.581 166.595C203.028 167.147 202.731 167.995 202.921 168.479C203.276 169.381 288.59 218.777 289.792 218.777C290.159 218.777 290.757 218.218 291.124 217.534C291.628 216.594 291.512 216.044 290.649 215.278ZM289.673 122.759C288.475 121.802 210.765 132.096 209.991 133.313C207.798 136.767 209.045 136.708 249.307 131.482C270.32 128.754 288.186 126.242 289.009 125.9C290.658 125.214 290.96 123.785 289.673 122.759ZM289.895 156.791C289.559 156.584 281.557 155.388 272.113 154.133C235.44 149.26 213.547 146.476 211.915 146.476C209.958 146.476 208.924 148.304 210.211 149.489C211.194 150.395 288.795 160.718 289.829 160.08C290.67 159.561 290.716 157.297 289.895 156.791ZM284.688 67.6294C283.77 67.1392 275.185 71.815 244.077 89.7452C222.381 102.251 204.16 112.952 203.585 113.527C202.702 114.407 202.678 114.737 203.433 115.644C203.924 116.235 204.81 116.592 205.401 116.438C206.5 116.151 283.517 71.9078 285.02 70.6993C286.2 69.7507 286.048 68.3564 284.688 67.6294ZM273.582 109.101C272.392 108.646 210.073 125.139 208.882 126.224C207.704 127.298 208.584 129.229 210.252 129.229C211.005 129.229 215.086 128.309 219.321 127.184C257.785 116.966 271.779 113.18 273.055 112.642C274.73 111.935 275.069 109.67 273.582 109.101ZM273.719 170.005C272.962 169.724 257.357 165.531 222.822 156.333C210.896 153.156 209.903 152.99 208.886 154.006C207.924 154.965 207.909 155.217 208.764 156.067C209.299 156.6 221.553 160.193 235.995 164.052C250.436 167.911 264.548 171.695 267.354 172.46C270.16 173.226 272.926 173.672 273.503 173.451C274.748 172.975 274.907 170.446 273.719 170.005ZM266.407 221.229C256.637 213.342 244.891 204.829 244.01 204.996C243.441 205.104 242.883 205.831 242.771 206.612C242.582 207.93 247.573 212.081 266.323 226.198C267.427 227.029 269.232 226.113 269.232 224.721C269.232 224.055 267.961 222.483 266.407 221.229ZM231.029 210.818C212.264 192.093 196.946 177.32 196.295 177.32C192.453 177.32 194.936 180.124 228.117 213.253C261.346 246.429 263.811 248.606 264.415 245.31C264.52 244.74 250.264 230.012 231.029 210.818ZM254.475 45.7837C254.036 45.3459 253.36 44.9877 252.972 44.9877C252.584 44.9877 247.08 50.1695 240.74 56.5036C229.184 68.0493 227.749 70.1361 230.943 70.7504C231.831 70.9208 235.519 67.6739 243.732 59.4885C250.079 53.1624 255.272 47.6701 255.272 47.2834C255.272 46.896 254.913 46.2214 254.475 45.7837ZM252.78 178.077C247.806 175.535 208.392 159.711 207.473 159.888C206.865 160.005 206.413 160.75 206.413 161.636C206.413 163.04 208.514 164.052 229.466 172.735C242.537 178.152 252.971 182.116 253.563 181.89C255.221 181.255 254.779 179.1 252.78 178.077ZM250.179 71.6863C249.994 71.2306 249.285 70.8572 248.602 70.8572C247.404 70.8572 202.256 104.812 199.965 107.437C198.608 108.992 199.079 110.656 200.875 110.656C202.161 110.656 250.668 73.8792 250.567 72.9811C250.538 72.7251 250.363 72.1427 250.179 71.6863ZM242.332 31.9694C241.795 31.7644 241.079 31.6987 240.74 31.8248C239.443 32.3043 189.462 98.0493 189.462 99.2744C189.462 100.882 190.998 101.536 192.326 100.495C192.875 100.064 202.264 88.0703 213.19 73.8421C224.116 59.6139 235.361 44.9771 238.181 41.3155C243.292 34.6784 244.18 32.6771 242.332 31.9694ZM239.666 106.442C238.603 106.035 208.338 118.184 206.821 119.627C205.603 120.785 206.354 122.596 208.051 122.596C209.211 122.596 235.799 111.872 239.378 109.961C240.883 109.158 241.061 106.976 239.666 106.442ZM212.506 207.67C196.848 187.342 192.162 181.674 191.124 181.801C187.898 182.195 189.472 184.679 209.089 210.154C219.905 224.2 229.134 236.076 229.597 236.546C230.773 237.736 232.682 236.836 232.614 235.124C232.583 234.336 223.625 222.105 212.506 207.67ZM216.576 182.958C209.199 177.303 202.61 172.401 201.934 172.065C200.11 171.156 198.189 173.17 199.443 174.678C200.264 175.666 208.893 182.402 222.533 192.705C228.101 196.911 230.023 197.414 230.001 194.661C229.992 193.601 226.587 190.631 216.576 182.958ZM224.651 250.999C220.148 243.383 219.352 242.453 217.832 243.035C216.091 243.702 216.454 244.975 220.36 251.921C224.912 260.013 226.152 261.577 227.582 261.03C229.432 260.321 228.718 257.877 224.651 250.999ZM219.023 38.0971C218.465 37.5399 217.615 37.2348 217.134 37.4185C216.094 37.8172 184.035 93.0207 183.636 95.1002C183.257 97.0749 185.351 97.833 186.826 96.255C187.699 95.3197 216.091 46.5836 219.274 40.556C219.883 39.4025 219.833 38.905 219.023 38.0971ZM215.342 272.175C213.924 268.891 205.59 248.919 196.824 227.791C188.057 206.663 180.523 189.154 180.081 188.882C179.097 188.275 177.707 188.751 177.289 189.839C177.118 190.284 179.149 195.858 181.802 202.225C184.455 208.593 192.813 228.727 200.373 246.969C207.934 265.21 214.539 280.556 215.052 281.072C215.817 281.841 216.171 281.857 217.016 281.157C218.459 279.962 218.271 278.951 215.342 272.175ZM213.615 86.5559C212.391 85.3348 210.381 86.7795 202.913 94.2485C194.574 102.59 192.926 105.35 196.286 105.35C197.326 105.35 200.304 102.836 205.925 97.2148C213.407 89.7299 214.826 87.7638 213.615 86.5559ZM211.067 16.0417C210.518 15.8315 209.672 15.8116 209.187 15.9979C207.984 16.4583 200.04 36.1058 200.536 37.3946C200.762 37.981 201.534 38.3379 202.329 38.2238C203.44 38.0639 204.572 36.0488 207.847 28.4047C212.243 18.1451 212.634 16.642 211.067 16.0417ZM197.828 204.845C188.474 188.644 186.695 185.943 185.373 185.943C184.479 185.943 183.743 186.396 183.622 187.018C183.442 187.952 203.798 223.987 205.488 225.728C206.153 226.412 208.15 225.52 208.535 224.366C208.649 224.026 203.831 215.241 197.828 204.845ZM197.51 50.3951C197.201 49.9029 196.385 49.6077 195.698 49.739C194.768 49.9168 193.033 53.3674 188.912 63.2363C177.026 91.7 176.8 92.3175 177.874 93.3987C178.565 94.0939 179.154 94.1914 179.885 93.7304C180.454 93.3715 184.634 84.1428 189.174 73.2212C198.695 50.3161 198.242 51.5565 197.51 50.3951ZM191.01 26.5805C190.525 25.3567 188.274 25.5736 187.562 26.9122C187.221 27.551 186.039 31.5057 184.934 35.7012C181.21 49.8379 172.1 83.766 171.177 86.9334C170.384 89.655 170.393 90.2062 171.239 91.0512C172.6 92.4084 173.988 91.6841 174.776 89.2059C175.307 87.5383 190.143 32.2533 191.093 28.4047C191.228 27.8574 191.191 27.0369 191.01 26.5805ZM189.477 247.632C188.447 243.984 185.005 231.298 181.83 219.441C173.754 189.283 174.267 190.918 172.877 190.918C172.217 190.918 171.38 191.291 171.016 191.747C170.221 192.746 186.981 255.876 188.25 256.659C189.255 257.279 191.475 256.161 191.403 255.071C191.375 254.628 190.507 251.28 189.477 247.632ZM176.146 257.25C175.466 252.325 174.729 247.053 174.509 245.535C174.077 242.552 172.542 241.347 171.059 242.827C170.323 243.561 170.454 245.815 171.836 256.245C172.75 263.14 173.767 269.051 174.097 269.379C175.223 270.502 177.16 269.574 177.274 267.857C177.335 266.948 176.827 262.175 176.146 257.25ZM173.692 35.5778C173.011 35.014 172.414 34.9835 171.637 35.4723C170.756 36.0269 169.854 41.354 167.036 62.63C163.854 86.6601 163.629 89.1707 164.596 89.8818C166.165 91.0367 167.443 90.244 167.835 87.8733C168.026 86.7231 169.53 75.3346 171.178 62.5657C172.826 49.7967 174.281 38.6795 174.413 37.861C174.544 37.0424 174.22 36.0149 173.692 35.5778ZM170.17 212.085C168.832 202.021 167.522 193.439 167.26 193.015C166.697 192.106 164.44 191.987 163.913 192.838C163.442 193.598 168.045 229.229 168.871 231.215C169.611 232.994 171.243 233.166 172.035 231.546C172.386 230.829 171.674 223.398 170.17 212.085ZM150.543 64.2239C148.971 52.7319 147.662 43.2544 147.634 43.1635C147.452 42.5719 144.344 43.1543 144.096 43.8269C143.807 44.6149 149.301 88.1864 149.91 89.9276C150.07 90.3839 150.957 90.7567 151.883 90.7567C153.432 90.7567 153.559 90.5332 153.484 87.9376C153.439 86.3868 152.115 75.716 150.543 64.2239ZM153.122 193.35C152.256 192.485 150.326 192.926 149.974 194.069C149.278 196.327 141.545 256.261 141.737 257.904C141.888 259.189 142.314 259.572 143.595 259.572L145.256 259.572L149.363 228.727C153.569 197.145 153.891 194.117 153.122 193.35ZM138.33 57.9224C130.139 27.6604 129.845 26.7464 128.277 26.7464C127.318 26.7464 126.578 27.1822 126.455 27.8176C126.181 29.2385 142.678 90.6493 143.646 91.8141C144.626 92.9928 146.95 91.8459 146.842 90.236C146.801 89.6105 142.97 75.0692 138.33 57.9224ZM145.921 191.821C145.373 191.611 144.533 191.589 144.055 191.772C143.1 192.138 143.19 191.835 135.953 218.777C133.16 229.175 128.792 245.429 126.247 254.897C123.702 264.365 121.768 272.5 121.95 272.973C122.493 274.386 124.954 273.965 125.646 272.341C126.402 270.566 146.918 193.975 146.918 192.927C146.918 192.529 146.47 192.031 145.921 191.821ZM145.233 23.7614C144.753 20.6604 144.337 18.0489 144.309 17.9574C144.13 17.3657 141.019 17.9481 140.767 18.6207C140.298 19.8724 142.19 32.575 142.96 33.3431C143.975 34.356 145.905 32.8695 146.014 30.991C146.065 30.116 145.713 26.8625 145.233 23.7614ZM139.032 89.0984C138.388 87.6391 129.969 67.4165 120.323 44.1585C104.565 6.16489 102.635 1.87188 101.308 1.87188C99.2524 1.87188 99.0477 3.02871 100.461 6.65906C101.531 9.40653 133.125 85.6929 135.927 92.2916C136.772 94.2823 137.314 94.7778 138.469 94.6133C140.355 94.346 140.541 92.5205 139.032 89.0984ZM139.283 189.599C138.383 188.854 138.057 188.862 137.265 189.653C135.901 191.014 119.545 230.606 119.8 231.929C119.926 232.584 120.643 233.039 121.549 233.039C122.935 233.039 123.891 231.101 131.366 213.139C135.921 202.194 139.807 192.621 140.002 191.864C140.213 191.044 139.922 190.129 139.283 189.599ZM129.475 87.3294C126.875 82.8301 121.995 74.3727 118.632 68.5355C113.453 59.5475 112.276 57.9224 110.947 57.9224C110.039 57.9224 109.292 58.3682 109.174 58.9817C108.962 60.0749 129.834 96.6928 131.12 97.4861C132.06 98.0652 133.431 97.5219 133.862 96.3989C134.05 95.9101 132.076 91.8287 129.475 87.3294ZM133.848 187.104C133.269 185.672 131.108 186.199 129.77 188.099C129.064 189.102 127.3 192.013 125.85 194.566C124.4 197.12 117.479 209.11 110.47 221.209C103.462 233.309 97.7268 243.649 97.7268 244.189C97.7268 245.758 99.8321 246.163 101.108 244.839C102.088 243.822 134.381 188.494 134.235 188.082C134.207 188 134.032 187.56 133.848 187.104ZM108.184 72.8471C91.3412 50.9357 87.7768 46.646 86.4134 46.646C85.4914 46.646 84.699 47.0785 84.5914 47.6409C84.4863 48.1882 93.4618 60.4264 104.537 74.8371C121.434 96.8221 124.938 101.038 126.314 101.038C127.247 101.038 128.035 100.609 128.14 100.043C128.241 99.496 119.261 87.2577 108.184 72.8471ZM127.218 182.5C126.619 182.271 125.713 182.355 125.204 182.687C123.384 183.87 73.7945 248.978 73.9686 249.953C74.0697 250.519 74.8501 250.948 75.7774 250.948C77.1382 250.948 80.3941 247.073 95.3789 227.623C126.854 186.767 128.305 184.838 128.305 183.868C128.305 183.345 127.816 182.729 127.218 182.5ZM93.5116 73.8175C74.531 54.895 63.459 44.3243 62.6181 44.3243C58.466 44.3243 60.2383 46.378 90.2178 76.3136C120.101 106.152 122.204 107.968 122.868 104.496C123.026 103.67 114.122 94.3652 93.5116 73.8175ZM122.544 178.094C122.301 177.851 121.623 177.652 121.039 177.652C119.818 177.652 103.045 194.178 103.045 195.382C103.045 195.819 103.668 196.51 104.429 196.918C105.677 197.583 106.673 196.81 114.401 189.179C122.263 181.417 123.79 179.338 122.544 178.094ZM116.881 107.419C110.834 102.257 89.8555 86.7861 88.8983 86.7821C86.9605 86.7735 86.7458 88.7256 88.4934 90.4516C89.3669 91.3146 95.7658 96.3664 102.712 101.678C115.148 111.188 117.693 112.532 118.204 109.86C118.322 109.239 117.727 108.14 116.881 107.419ZM117.891 172.787C117.647 172.544 117.029 172.345 116.518 172.345C115.354 172.345 67.8078 208.733 67.3218 209.996C67.1264 210.505 67.4362 211.389 68.0105 211.962C69.2297 213.179 66.6092 215.008 97.5965 191.309C116.88 176.56 119.383 174.276 117.891 172.787ZM115.889 245.025C114.186 244.373 113.423 245.579 109.415 255.26C105.223 265.386 104.901 267.2 107.295 267.2C108.169 267.2 109.04 266.827 109.229 266.371C109.418 265.915 111.245 261.549 113.289 256.67C117.289 247.118 117.609 245.684 115.889 245.025ZM109.898 111.443C69.8386 88.126 28.8016 64.8773 27.9806 65.0332C27.403 65.1426 26.8412 65.8584 26.7309 66.6225C26.5733 67.7203 27.4827 68.5733 31.0518 70.6767C34.9944 73.0003 59.2797 87.0116 100.018 110.467C106.581 114.246 112.414 117.248 112.981 117.14C113.549 117.033 114.106 116.299 114.219 115.51C114.384 114.357 113.542 113.564 109.898 111.443ZM113.283 166.774C112.517 166.48 105.692 170.07 92.1422 177.896C81.138 184.251 63.459 194.444 52.8562 200.546C42.2534 206.648 33.2042 211.939 32.7475 212.305C31.6254 213.203 31.6939 215.417 32.8566 215.863C33.7719 216.213 40.2585 212.581 90.0822 183.826C108.463 173.217 114.06 169.689 114.215 168.611C114.336 167.766 113.965 167.035 113.283 166.774ZM111.246 161.234C111.062 160.779 110.387 160.405 109.745 160.405C108.12 160.405 78.356 172.817 77.1887 173.981C76.4083 174.761 76.3903 175.117 77.0917 175.96C77.5623 176.525 78.2304 176.988 78.576 176.988C79.5233 176.988 109.898 164.374 110.856 163.583C111.734 162.856 111.784 162.563 111.246 161.234ZM109.526 119.337C108.703 119.022 98.5671 114.851 87.0004 110.067C75.4331 105.283 65.3695 101.37 64.6356 101.37C63.1299 101.37 62.3561 102.725 63.1392 103.99C63.8339 105.112 109.127 123.821 110.191 123.426C111.641 122.888 111.165 119.965 109.526 119.337ZM106.905 126.014C105.696 125.633 91.1318 121.699 74.5397 117.271C48.6224 110.353 44.2411 109.35 43.438 110.152C41.4471 112.138 43.1542 113.098 53.7244 115.934C97.1432 127.586 106.195 129.918 107.366 129.751C108.141 129.64 108.78 128.966 108.899 128.132C109.058 127.02 108.616 126.551 106.905 126.014ZM108.086 154.033C106.702 153.503 44.4837 170.147 43.2413 171.379C42.3864 172.227 42.4037 172.48 43.3802 173.455C44.4205 174.493 46.234 174.101 71.2758 167.421C112.238 156.494 108.665 157.588 108.908 155.905C109.034 155.03 108.699 154.268 108.086 154.033ZM106.884 133.449C106.436 133.173 88.5626 130.636 67.1649 127.813C34.327 123.48 28.1169 122.82 27.3385 123.581C26.1173 124.776 26.8313 126.457 28.7305 126.86C29.5687 127.037 42.9681 128.832 58.5066 130.848C74.0451 132.863 91.0959 135.081 96.3973 135.777C106.059 137.044 107.698 136.906 107.698 134.826C107.698 134.344 107.332 133.725 106.884 133.449ZM106.652 147.36C106.024 147.119 98.1489 147.869 89.1535 149.026C50.5648 153.99 28.6241 156.991 27.9673 157.396C27.1025 157.929 27.0387 160.188 27.8736 160.703C28.6374 161.175 105.006 151.275 106.369 150.528C107.816 149.735 107.983 147.87 106.652 147.36ZM106.249 140.165C105.766 139.982 82.3379 139.908 54.1857 140.003L2.99999 140.174L2.99999 141.832L2.99999 143.491L54.8505 143.491L106.701 143.491L106.914 141.996C107.031 141.173 106.732 140.349 106.249 140.165ZM96.6001 30.3946C91.3512 21.3125 90.5409 20.5549 88.8817 23.1797C88.4177 23.914 89.4341 26.2316 92.7432 31.9826C95.214 36.2763 97.649 39.9471 98.1542 40.1408C99.045 40.4817 101.073 39.2818 101.029 38.4394C101.018 38.2099 99.0244 34.5901 96.6001 30.3946ZM87.9769 212.587C86.7146 211.326 84.4577 213.1 73.8882 223.66C62.299 235.238 60.8252 237.392 64.1642 237.872C65.1175 238.01 68.6932 234.844 76.9541 226.553C87.5189 215.948 89.2047 213.812 87.9769 212.587ZM73.6522 74.3727C72.8173 73.602 67.3863 69.3454 61.5844 64.9138C50.9863 56.8193 48.203 55.494 48.203 58.5413C48.203 60.2546 71.5603 78.2505 73.4568 77.9984C75.3367 77.7477 75.4304 76.0138 73.6522 74.3727ZM58.008 182.402C57.1439 181.953 52.696 183.517 40.7245 188.479C26.453 194.393 24.6043 195.33 24.6043 196.648C24.6043 197.466 24.9108 198.325 25.2851 198.556C25.9013 198.936 50.6453 189.168 56.6785 186.163C59.3601 184.827 59.8753 183.37 58.008 182.402ZM45.0454 92.9444C43.5677 91.8273 25.9963 84.7869 24.6861 84.7869C23.0947 84.7869 22.2771 86.7423 23.4165 87.8242C23.8871 88.2713 28.7304 90.4549 34.1794 92.6777C41.7469 95.7648 44.2982 96.5442 44.9816 95.9784C46.1024 95.0504 46.1296 93.7636 45.0454 92.9444ZM26.1 104.468C25.8255 104.304 22.057 103.229 17.7249 102.08C11.6218 100.461 9.63818 100.164 8.91693 100.762C7.85998 101.636 7.79418 102.032 8.51409 103.163C9.17419 104.199 24.2786 108.27 25.5942 107.766C26.6265 107.371 26.9901 104.998 26.1 104.468ZM24.8257 176.767C24.032 175.975 22.1109 176.29 13.6685 178.6C4.18655 181.192 3.99712 181.277 3.99712 182.926C3.99712 184.906 5.56258 184.966 12.0984 183.237C24.504 179.954 25.2691 179.673 25.2691 178.407C25.2691 177.748 25.0697 177.01 24.8257 176.767Z"
        fill="white"
        fillRule="evenodd"
      />
      <g clipPath="url(#clip0_1577_5746)">
        <path
          d="M160.5 52.2227L165.351 62.4948L171.5 52.9437L174.969 63.761L182.313 55.0943L184.339 66.2719L192.752 58.6379L193.302 69.9844L202.639 63.5137L201.703 74.8349L211.805 69.6384L209.4 80.7407L220.093 76.907L216.26 87.6004L227.362 85.1954L222.166 95.297L233.487 94.3615L227.016 103.698L238.363 104.249L230.729 112.661L241.906 114.688L233.239 122.032L244.057 125.5L234.506 131.65L244.778 136.5L234.506 141.351L244.057 147.501L233.239 150.969L241.906 158.313L230.729 160.34L238.363 168.752L227.016 169.303L233.487 178.639L222.166 177.704L227.362 187.805L216.26 185.401L220.093 196.094L209.4 192.26L211.805 203.363L201.703 198.166L202.639 209.487L193.302 203.017L192.752 214.363L184.339 206.729L182.313 217.906L174.969 209.24L171.5 220.057L165.351 210.506L160.5 220.778L155.649 210.506L149.5 220.057L146.031 209.24L138.687 217.906L136.661 206.729L128.248 214.363L127.698 203.017L118.361 209.487L119.297 198.166L109.195 203.363L111.6 192.26L100.907 196.094L104.74 185.401L93.6379 187.805L98.8344 177.704L87.5132 178.639L93.9839 169.303L82.6374 168.752L90.2714 160.34L79.0939 158.313L87.7606 150.969L76.9432 147.501L86.4943 141.351L76.2222 136.5L86.4943 131.65L76.9432 125.5L87.7606 122.032L79.0939 114.688L90.2714 112.661L82.6374 104.249L93.9839 103.698L87.5132 94.3615L98.8344 95.297L93.6379 85.1954L104.74 87.6004L100.907 76.907L111.6 80.7407L109.195 69.6384L119.297 74.8349L118.361 63.5137L127.698 69.9844L128.248 58.6379L136.661 66.2719L138.687 55.0943L146.031 63.761L149.5 52.9437L155.649 62.4948L160.5 52.2227Z"
          fill="#FF0420"
        />
      </g>
      <g clipPath="url(#clip1_1577_5746)">
        <path
          clipRule="evenodd"
          d="M152.172 125.111C152.938 125.111 153.56 125.736 153.56 126.507C153.56 130.361 156.667 133.486 160.5 133.486C164.333 133.486 167.441 130.361 167.441 126.507C167.441 125.736 168.062 125.111 168.829 125.111C169.595 125.111 170.217 125.736 170.217 126.507C170.217 131.903 165.866 136.277 160.5 136.277C155.134 136.277 150.783 131.903 150.783 126.507C150.783 125.736 151.405 125.111 152.172 125.111Z"
          fill="white"
          fillRule="evenodd"
        />
        <path
          d="M135.515 110.281L136.441 112.642C137.259 114.728 138.897 116.377 140.966 117.198L143.323 118.132L140.966 119.066C138.897 119.887 137.259 121.537 136.441 123.622L135.515 125.983L134.589 123.622C133.77 121.537 132.132 119.887 130.063 119.066L127.707 118.132L130.063 117.198C132.132 116.377 133.77 114.728 134.589 112.642L135.515 110.281Z"
          fill="white"
        />
        <path
          d="M185.486 110.281L186.412 112.642C187.23 114.728 188.869 116.377 190.938 117.198L193.294 118.132L190.938 119.066C188.869 119.887 187.23 121.537 186.412 123.622L185.486 125.983L184.56 123.622C183.742 121.537 182.103 119.887 180.034 119.066L177.678 118.132L180.034 117.198C182.103 116.377 183.742 114.728 184.56 112.642L185.486 110.281Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1577_5746">
          <rect
            fill="white"
            height="168.556"
            transform="translate(76.2222 52.2227)"
            width="168.556"
          />
        </clipPath>
        <clipPath id="clip1_1577_5746">
          <rect
            fill="white"
            height="28.8519"
            transform="translate(124.815 107.648)"
            width="71.3704"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

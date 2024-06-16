export default function MasternoteMarkBot(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="166"
      height="166"
      fill="none"
      viewBox="0 0 166 166"
      {...props}
    >
      <g clipPath="url(#a)">
        <mask
          id="b"
          width="190"
          height="190"
          x="-12"
          y="-12"
          maskUnits="userSpaceOnUse"
          style={{ maskType: 'alpha' }}
        >
          <path
            fill="#D9D9D9"
            d="M.5 27a8 8 0 0 1 8-8h54a8 8 0 0 1 8 8v54a8 8 0 0 1-8 8h-54a8 8 0 0 1-8-8V27Zm17 75a8 8 0 0 1 8-8h37a8 8 0 0 1 8 8v37a8 8 0 0 1-8 8h-37a8 8 0 0 1-8-8v-37Zm58-93.5a8 8 0 0 1 8-8h74a8 8 0 0 1 8 8v74a8 8 0 0 1-8 8h-74a8 8 0 0 1-8-8v-74Zm0 95a8 8 0 0 1 8-8h54a8 8 0 0 1 8 8v54a8 8 0 0 1-8 8h-54a8 8 0 0 1-8-8v-54Z"
          />
        </mask>
        <g mask="url(#b)">
          <path fill="url(#c)" d="M0 0h166v166H0z" />
        </g>
      </g>
      <defs>
        <linearGradient
          id="c"
          x1="166"
          x2="0"
          y1="83"
          y2="83"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00F260" />
          <stop offset="1" stopColor="#0575E6" />
        </linearGradient>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h166v166H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

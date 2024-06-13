import { AppName } from '../../helpers/constants'

export default function Logo() {
  return (
    <h2
      role="banner"
      aria-label={`${AppName} logo`}
      className="text-2xl font-semibold"
    >
      {AppName}
    </h2>
  )
}

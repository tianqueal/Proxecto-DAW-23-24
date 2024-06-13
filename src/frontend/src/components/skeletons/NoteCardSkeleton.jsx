import ContentLoader from 'react-content-loader'
import useApi from '../../hooks/useApi'

export default function NoteCardSkeleton(props) {
  const { currentTheme } = useApi() ?? {}
  const backgroundColor = currentTheme === 'light' ? '#eaeced' : '#374151'
  const foregroundColor = currentTheme === 'light' ? '#ffffff' : '#4b5563'
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={160}
      viewBox="0 0 400 160"
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      {...props}
    >
      <rect x="2" y="132" rx="3" ry="3" width="88" height="6" />
      <rect x="2" y="35" rx="3" ry="3" width="52" height="6" />
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="93" rx="3" ry="3" width="178" height="6" />
      <rect x="1" y="112" rx="3" ry="3" width="380" height="6" />
      <rect x="1" y="152" rx="3" ry="3" width="410" height="6" />
    </ContentLoader>
  )
}

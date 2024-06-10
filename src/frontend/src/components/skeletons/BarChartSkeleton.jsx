import ContentLoader from 'react-content-loader'

export default function BarChartSkeleton(props) {
  return (
    <ContentLoader width={200} height={200} viewBox="0 0 200 200" {...props}>
      <rect x="0" y="160" rx="0" ry="0" width="25" height="40" />
      <rect x="30" y="145" rx="0" ry="0" width="25" height="55" />
      <rect x="60" y="126" rx="0" ry="0" width="25" height="74" />
      <rect x="90" y="80" rx="0" ry="0" width="25" height="120" />
      <rect x="120" y="142" rx="0" ry="0" width="25" height="58" />
    </ContentLoader>
  )
}

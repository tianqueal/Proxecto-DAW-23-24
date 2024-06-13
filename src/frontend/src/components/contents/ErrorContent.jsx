import AnimatedContent from './AnimatedContent'

export default function ErrorContent() {
  return (
    <AnimatedContent keyProp="error">
      <p className="text-xl font-medium" role="alert">
        Ha ocurrido un error
      </p>
    </AnimatedContent>
  )
}

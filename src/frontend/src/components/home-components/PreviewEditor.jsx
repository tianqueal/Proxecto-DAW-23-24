import AnimatedHeaderPreviewEditor from './AnimatedHeaderPreviewEditor'
import FloatingChevron from './FloatingChevron'
import PreviewEditorContent from './PreviewEditorContent'

export default function PreviewEditor() {
  return (
    <section className="text-center text-gray-800 dark:text-white">
      <FloatingChevron />
      <AnimatedHeaderPreviewEditor />
      <PreviewEditorContent />
    </section>
  )
}

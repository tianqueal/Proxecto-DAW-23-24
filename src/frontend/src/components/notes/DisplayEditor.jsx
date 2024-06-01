import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useEditorjs from '../../hooks/useEditorjs'
import './DisplayEditor.css'

export default function DisplayEditor({ data, isOwner, onSuccess = null }) {
  const { setEditorInitData } = useEditorjs()
  const prevData = useRef()

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(prevData.current)) {
      const newData = data && data?.blocks?.length > 0 ? data : { blocks: [] }
      console.log('DisplayEditor new policy', {
        data: newData,
        readOnly: !isOwner,
        autofocus: isOwner,
      })
      setEditorInitData({
        data: newData,
        readOnly: !isOwner,
        autofocus: isOwner,
        onSuccess,
      })
      prevData.current = data
    }
  }, [data, setEditorInitData, isOwner, onSuccess])
  return <div id="editorjs" className="editor-container"></div>
}

DisplayEditor.propTypes = {
  data: PropTypes.object.isRequired,
  isOwner: PropTypes.bool,
  onSuccess: PropTypes.func,
}

import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useEditorjs from '../../hooks/useEditorjs'
import './DisplayEditor.css'

export default function DisplayEditor({ data, isOwner, onSuccess = null }) {
  const { setEditorInitData } = useEditorjs()
  const prevData = useRef()
  const dataRef = useRef(data)

  useEffect(() => {
    if (JSON.stringify(dataRef.current) !== JSON.stringify(prevData.current)) {
      const newData =
        dataRef.current && dataRef.current?.blocks?.length > 0
          ? dataRef.current
          : null
      setEditorInitData({
        data: newData,
        readOnly: !isOwner,
        autofocus: isOwner,
        onSuccess,
      })
      prevData.current = data
    }
  }, [data, setEditorInitData, isOwner, onSuccess])

  /* editorjs.current.isReady.then(() => {
        editorjs.current.render(newData)
      }) */
  /* setEditorInitData({
        data: newData,
        readOnly: !isOwner,
        autofocus: isOwner,
        onSuccess,
      }) */
  /* 
  useEffect(() => {
    if (JSON.stringify(dataRef.current) !== JSON.stringify(prevData.current)) {
      const newData =
        dataRef.current && dataRef.current?.blocks?.length > 0
          ? dataRef.current
          : null
      
      console.log('editorjs.instance', editorjs)
      
      editorjs.current.isReady.then(() => {
        editorjs.current.readOnly = !isOwner
        editorjs.current.autofocus = isOwner

        editorjs.current.render(newData)
      })
      prevData.current = data
    }
  }, [data, setEditorInitData, isOwner, onSuccess, editorjs])
  
  */
  /* return <div id="editorjs" className="editor-container"></div> */
}

DisplayEditor.propTypes = {
  data: PropTypes.object,
  isOwner: PropTypes.bool,
  onSuccess: PropTypes.func,
}

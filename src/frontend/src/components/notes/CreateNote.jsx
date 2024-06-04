/* import { Roles } from '../../helpers/constants'
import useAuth from '../../hooks/useAuth' */
import DisplayEditor from './DisplayEditor'
import { useNavigate } from 'react-router-dom'

export default function CreateNote() {
  /* useAuth({ middleware: 'auth', requiredRole: Roles.USER}) */
  const navigate = useNavigate()

  const onSuccess = (newNoteId) => {
    navigate(`/notes/${newNoteId}`)
  }
  return <DisplayEditor data={{}} isOwner={true} onSuccess={onSuccess} />
}

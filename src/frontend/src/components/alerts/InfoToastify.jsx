import { toast } from 'react-toastify'

export default function InfoToastify({ message, autoClose = true }) {
  toast.info(message, {
    autoClose: autoClose ? 3000 : false,
    draggable: true,
  })
}

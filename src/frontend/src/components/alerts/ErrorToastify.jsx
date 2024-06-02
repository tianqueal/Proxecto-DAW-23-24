import { toast } from 'react-toastify'

export default function ErrorToastify({ message, autoClose = false }) {
  toast.error(message, {
    autoClose,
    draggable: true,
  })
}

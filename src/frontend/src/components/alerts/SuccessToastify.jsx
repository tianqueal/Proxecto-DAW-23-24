import { toast } from 'react-toastify'

export default function SuccessToastify({ message }) {
  toast.success(message, {
    draggable: true,
  })
}

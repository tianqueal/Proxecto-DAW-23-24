import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/admin/AdminNavbar'

export default function AdministrationLayout() {
  return (
    <>
      <h1 className="hidden" aria-hidden="true">
        Administración
      </h1>
      <AdminNavbar />

      <Outlet />
    </>
  )
}

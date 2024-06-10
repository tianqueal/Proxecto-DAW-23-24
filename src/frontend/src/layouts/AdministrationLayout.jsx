import { Outlet } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'

export default function AdministrationLayout() {
  return (
    <section className="relative flex min-h-screen">
      <h1 className="hidden" aria-hidden="true">
        Administración
      </h1>
      <Sidebar />
      <section
        className={`mx-auto max-w-7xl flex-1 p-6 transition-all duration-300`}
      >
        <Outlet />
      </section>
    </section>
  )
}

import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import useApi from '../hooks/useApi'
import Footer from '../components/navigations/Footer'
import Navbar from '../components/navigations/Navbar'

export default function HomeLayout() {
  const { currentTheme } = useApi()
  return (
    <>
      <div
        role="html"
        className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900 transition-colors duration-500 dark:bg-neutral-900 dark:text-neutral-50"
      >
        <Navbar />
        <main className="mx-auto w-full flex-1">
          <Outlet />
        </main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          stacked={true}
          theme={currentTheme}
        />
      </div>
    </>
  )
}

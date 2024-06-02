import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar from '../components/navigations/Navbar'
import useApi from '../hooks/useApi'
import Footer from '../components/navigations/Footer'

export default function Layout() {
  const { currentTheme } = useApi()
  return (
    <>
      <div
        role="html"
        className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900 transition-colors duration-500 dark:bg-neutral-900 dark:text-neutral-50"
      >
        <Navbar />
        <main className="mx-auto min-h-screen w-full flex-1 p-4 sm:max-w-xl md:w-screen md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
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

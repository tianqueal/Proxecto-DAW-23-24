import { PropTypes } from 'prop-types'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar from '../components/navigations/Navbar'
import useApi from '../hooks/useApi'
import Footer from '../components/navigations/Footer'

export default function Layout({ className }) {
  const { currentTheme } = useApi() ?? {}
  return (
    <>
      <div
        role="html"
        className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900 transition-colors duration-500 dark:bg-neutral-900 dark:text-neutral-50"
      >
        <Navbar />
        <main className={className}>
          <Outlet />
        </main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          stacked={true}
          theme={currentTheme}
        />
      </div>
      <ScrollRestoration />
    </>
  )
}

Layout.propTypes = {
  className: PropTypes.string,
}

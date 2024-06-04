/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Roles } from './helpers/constants'

import CubeLoader from './components/loaders/CubeLoader'
import Layout from './layouts/Layout'
import NoteEditorLayout from './layouts/NoteEditorLayout'

const Home = lazy(() => import('./views/Home'))
const Community = lazy(() => import('./views/Community'))
const Register = lazy(() => import('./views/Register'))
const Login = lazy(() => import('./views/Login'))
const Discord = lazy(() => import('./views/Discord'))
const PageNotFound = lazy(() => import('./views/PageNotFound'))
const Profile = lazy(() => import('./views/Profile'))
import NoteEditor from './views/NoteEditor'
import ProtectedRoute from './ProtectedRoute'
const MyNotes = lazy(() => import('./views/MyNotes'))
// const Test = lazy(() => import('./views/Test'))
/* const NoteEditor = lazy(() => import('./views/NoteEditor')) */

/* import Home from './views/Home'
import Community from './views/Community'
import Register from './views/Register'
import Login from './views/Login'
import Discord from './views/Discord'
import PageNotFound from './views/PageNotFound'
import Profile from './views/Profile'
import NoteEditor from './views/NoteEditor'
import MyNotes from './views/MyNotes'
import Test from './views/Test' */

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout className="mx-auto w-full flex-1" />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute
            element={
              <Suspense
                fallback={<CubeLoader className="bg-gray-800 dark:bg-white" />}
              >
                <Home />
              </Suspense>
            }
            allowedRoles={[Roles.GUEST]}
          />
        ),
      },
    ],
  },
  {
    path: '/',
    element: (
      <Layout className='2xl:max-w-7xl" mx-auto min-h-screen w-full flex-1 p-4 sm:max-w-xl md:w-screen md:max-w-2xl lg:max-w-4xl xl:max-w-6xl' />
    ),
    children: [
      {
        path: 'community',
        element: (
          <Suspense
            fallback={<CubeLoader className="bg-gray-800 dark:bg-white" />}
          >
            <Community />
          </Suspense>
        ),
      },
      {
        path: 'discord',
        element: (
          <Suspense
            fallback={<CubeLoader className="bg-gray-800 dark:bg-white" />}
          >
            <Discord />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <ProtectedRoute
            element={
              <Suspense
                fallback={<CubeLoader className="bg-gray-800 dark:bg-white" />}
              >
                <Register />
              </Suspense>
            }
            allowedRoles={[Roles.GUEST]}
          />
        ),
      },
      {
        path: 'login',
        element: (
          <ProtectedRoute
            element={
              <Suspense
                fallback={<CubeLoader className="bg-gray-800 dark:bg-white" />}
              >
                <Login />
              </Suspense>
            }
            allowedRoles={[Roles.GUEST]}
          />
        ),
      },
      {
        path: 'my-notes',
        element: (
          <ProtectedRoute
            element={
              <Suspense
                fallback={<CubeLoader className="bg-gray-800 dark:bg-white" />}
              >
                <MyNotes />
              </Suspense>
            }
            allowedRoles={[Roles.USER]}
          />
        ),
      },
      {
        path: 'notes',
        element: <NoteEditorLayout />,
        children: [
          {
            path: 'create',
            element: (
              <ProtectedRoute
                element={<NoteEditor />}
                allowedRoles={[Roles.USER]}
              />
            ),
          },
          {
            path: ':noteId',
            element: <NoteEditor />,
          },
          {
            path: '',
            element: <Navigate to="/" />,
          },
        ],
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute
            element={
              <Suspense
                fallback={<CubeLoader className="bg-gray-800 dark:bg-white" />}
              >
                <Profile />
              </Suspense>
            }
            allowedRoles={[Roles.USER_AUTHENTICATED]}
          />
        ),
      },
      {
        path: '*',
        element: (
          <Suspense
            fallback={<CubeLoader className="bg-gray-800 dark:bg-white" />}
          >
            <PageNotFound />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: 'admin',
    element: (
      <ProtectedRoute
        element={
          <Suspense
            fallback={<CubeLoader className="bg-gray-800 dark:bg-white" />}
          >
            <Layout className="mx-auto w-full flex-1" />
          </Suspense>
        }
        allowedRoles={[Roles.ADMIN]}
      />
    ),
    children: [
      {
        path: 'dashboard',
        index: true,
        element: (
          <Suspense
            fallback={<CubeLoader className="bg-gray-800 dark:bg-white" />}
          >
            <h2 className="mt-8 text-2xl font-semibold">Dashboard Admin</h2>
          </Suspense>
        ),
      },
    ],
  },
])

export default router

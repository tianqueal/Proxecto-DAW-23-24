/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Roles } from './helpers/constants'

import CubeLoader from './components/loaders/CubeLoader'
import Layout from './layouts/Layout'
import HomeLayout from './layouts/HomeLayout'
import NoteEditorLayout from './layouts/NoteEditorLayout'
import AdministrationLayout from './layouts/AdministrationLayout'

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
const Test = lazy(() => import('./views/Test'))
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
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={<CubeLoader className="bg-gray-800 dark:bg-white" />}
          >
            <Home />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <Layout />,
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
          <Suspense
            fallback={<CubeLoader className="bg-gray-800 dark:bg-white" />}
          >
            <Register />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense
            fallback={<CubeLoader className="bg-gray-800 dark:bg-white" />}
          >
            <Login />
          </Suspense>
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
            allowedRoles={[Roles.USER, Roles.ADMIN]}
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
            <AdministrationLayout />
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
            <Test />
          </Suspense>
        ),
      },
    ],
  },
])

export default router

/**
 * @author Christian Alvarado
 * @version v1.0.0
 * @license MIT
 * @file This file contains the router configuration for the frontend.
 * @see https://github.com/tianqueal/Proxecto-DAW-23-24/wiki/
 */

/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { LayoutTypes, Roles } from './helpers/constants'

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
const MyNotes = lazy(() => import('./views/MyNotes'))
const Cookies = lazy(() => import('./views/Cookies'))
import NoteEditor from './views/NoteEditor'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from './views/admin/Dashboard'
import Users from './views/admin/Users'
import Notes from './views/admin/Notes'
import Topics from './views/admin/Topics'
import AdministrationLayout from './layouts/AdministrationLayout'
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

const Loader = () => <CubeLoader className="bg-gray-800 dark:bg-white" />

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout className={LayoutTypes.FULLSCREEN} />,
    children: [
      {
        index: true,
        element:
          ({
            /* <ProtectedRoute
            element={
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            }
            allowedRoles={[Roles.GUEST]}
          /> */
          },
          (
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          )),
      },
    ],
  },
  {
    path: '/',
    element: <Layout className={LayoutTypes.DEFAULT} />,
    children: [
      {
        path: 'community',
        element: (
          <Suspense fallback={<Loader />}>
            <Community />
          </Suspense>
        ),
      },
      {
        path: 'discord',
        element: (
          <Suspense fallback={<Loader />}>
            <Discord />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <ProtectedRoute
            element={
              <Suspense fallback={<Loader />}>
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
              <Suspense fallback={<Loader />}>
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
              <Suspense fallback={<Loader />}>
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
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            }
            allowedRoles={[Roles.USER_AUTHENTICATED]}
          />
        ),
      },
      {
        path: 'cookies',
        element: (
          <Suspense fallback={<Loader />}>
            <Cookies />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Loader />}>
            <PageNotFound />
          </Suspense>
        ),
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute
            element={
              <Suspense fallback={<Loader />}>
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
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: 'users',
            element: (
              <Suspense fallback={<Loader />}>
                <Users />
              </Suspense>
            ),
          },
          {
            path: 'notes',
            element: (
              <Suspense fallback={<Loader />}>
                <Notes />
              </Suspense>
            ),
          },
          {
            path: 'topics',
            element: (
              <Suspense fallback={<Loader />}>
                <Topics />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
])

export default router

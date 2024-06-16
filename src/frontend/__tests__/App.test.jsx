import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import router from '../src/router'

const routes = router.routes

describe('App Routes', () => {
  it('should render the Home page on "/"', () => {
    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: ['/'],
    })
    render(<RouterProvider router={memoryRouter} />)

    expect(
      screen.findByText(/Descubre una nueva forma de alcanzar tus metas/gi),
    ).toBeTruthy()
  })

  it('should render the Community page on "/community"', () => {
    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: ['/community'],
    })
    render(<RouterProvider router={memoryRouter} />)

    expect(screen.findByText(/Notas de la comunidad/i)).toBeTruthy()
  })

  it('should render the Discord page on "/discord"', () => {
    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: ['/discord'],
    })
    render(<RouterProvider router={memoryRouter} />)

    expect(screen.findByText(/Te presentamos a MasterNote Bot/i)).toBeTruthy()
  })

  it('should render the Page Not Found on invalid route', () => {
    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: ['/invalid-route'],
    })
    render(<RouterProvider router={memoryRouter} />)

    expect(screen.findByText(/404/i)).toBeTruthy()
  })
})

/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as AdminImport } from './routes/_admin'
import { Route as LayoutIndexImport } from './routes/_layout/index'
import { Route as LayoutReleasesImport } from './routes/_layout/releases'
import { Route as LayoutLabelsImport } from './routes/_layout/labels'
import { Route as LayoutArtistsImport } from './routes/_layout/artists'
import { Route as LayoutAboutImport } from './routes/_layout/about'
import { Route as AdminSignupImport } from './routes/_admin/signup'
import { Route as AdminResetPasswordImport } from './routes/_admin/reset-password'
import { Route as AdminRecoverPasswordImport } from './routes/_admin/recover-password'
import { Route as AdminLoginImport } from './routes/_admin/login'
import { Route as AdminDashboardImport } from './routes/_admin/_dashboard'
import { Route as LayoutReleasesSlugImport } from './routes/_layout/releases_.$slug'
import { Route as LayoutLabelsSlugImport } from './routes/_layout/labels_.$slug'
import { Route as LayoutArtistsSlugImport } from './routes/_layout/artists_.$slug'
import { Route as AdminDashboardDashboardIndexImport } from './routes/_admin/_dashboard/dashboard/index'
import { Route as AdminDashboardDashboardSettingsImport } from './routes/_admin/_dashboard/dashboard/settings'
import { Route as AdminDashboardDashboardReleasesImport } from './routes/_admin/_dashboard/dashboard/releases'
import { Route as AdminDashboardDashboardItemsImport } from './routes/_admin/_dashboard/dashboard/items'
import { Route as AdminDashboardDashboardAdminImport } from './routes/_admin/_dashboard/dashboard/admin'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const AdminRoute = AdminImport.update({
  id: '/_admin',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutReleasesRoute = LayoutReleasesImport.update({
  path: '/releases',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutLabelsRoute = LayoutLabelsImport.update({
  path: '/labels',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutArtistsRoute = LayoutArtistsImport.update({
  path: '/artists',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutAboutRoute = LayoutAboutImport.update({
  path: '/about',
  getParentRoute: () => LayoutRoute,
} as any)

const AdminSignupRoute = AdminSignupImport.update({
  path: '/signup',
  getParentRoute: () => AdminRoute,
} as any)

const AdminResetPasswordRoute = AdminResetPasswordImport.update({
  path: '/reset-password',
  getParentRoute: () => AdminRoute,
} as any)

const AdminRecoverPasswordRoute = AdminRecoverPasswordImport.update({
  path: '/recover-password',
  getParentRoute: () => AdminRoute,
} as any)

const AdminLoginRoute = AdminLoginImport.update({
  path: '/login',
  getParentRoute: () => AdminRoute,
} as any)

const AdminDashboardRoute = AdminDashboardImport.update({
  id: '/_dashboard',
  getParentRoute: () => AdminRoute,
} as any)

const LayoutReleasesSlugRoute = LayoutReleasesSlugImport.update({
  path: '/releases/$slug',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutLabelsSlugRoute = LayoutLabelsSlugImport.update({
  path: '/labels/$slug',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutArtistsSlugRoute = LayoutArtistsSlugImport.update({
  path: '/artists/$slug',
  getParentRoute: () => LayoutRoute,
} as any)

const AdminDashboardDashboardIndexRoute =
  AdminDashboardDashboardIndexImport.update({
    path: '/dashboard/',
    getParentRoute: () => AdminDashboardRoute,
  } as any)

const AdminDashboardDashboardSettingsRoute =
  AdminDashboardDashboardSettingsImport.update({
    path: '/dashboard/settings',
    getParentRoute: () => AdminDashboardRoute,
  } as any)

const AdminDashboardDashboardReleasesRoute =
  AdminDashboardDashboardReleasesImport.update({
    path: '/dashboard/releases',
    getParentRoute: () => AdminDashboardRoute,
  } as any)

const AdminDashboardDashboardItemsRoute =
  AdminDashboardDashboardItemsImport.update({
    path: '/dashboard/items',
    getParentRoute: () => AdminDashboardRoute,
  } as any)

const AdminDashboardDashboardAdminRoute =
  AdminDashboardDashboardAdminImport.update({
    path: '/dashboard/admin',
    getParentRoute: () => AdminDashboardRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_admin': {
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_admin/_dashboard': {
      preLoaderRoute: typeof AdminDashboardImport
      parentRoute: typeof AdminImport
    }
    '/_admin/login': {
      preLoaderRoute: typeof AdminLoginImport
      parentRoute: typeof AdminImport
    }
    '/_admin/recover-password': {
      preLoaderRoute: typeof AdminRecoverPasswordImport
      parentRoute: typeof AdminImport
    }
    '/_admin/reset-password': {
      preLoaderRoute: typeof AdminResetPasswordImport
      parentRoute: typeof AdminImport
    }
    '/_admin/signup': {
      preLoaderRoute: typeof AdminSignupImport
      parentRoute: typeof AdminImport
    }
    '/_layout/about': {
      preLoaderRoute: typeof LayoutAboutImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/artists': {
      preLoaderRoute: typeof LayoutArtistsImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/labels': {
      preLoaderRoute: typeof LayoutLabelsImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/releases': {
      preLoaderRoute: typeof LayoutReleasesImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/': {
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/artists/$slug': {
      preLoaderRoute: typeof LayoutArtistsSlugImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/labels/$slug': {
      preLoaderRoute: typeof LayoutLabelsSlugImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/releases/$slug': {
      preLoaderRoute: typeof LayoutReleasesSlugImport
      parentRoute: typeof LayoutImport
    }
    '/_admin/_dashboard/dashboard/admin': {
      preLoaderRoute: typeof AdminDashboardDashboardAdminImport
      parentRoute: typeof AdminDashboardImport
    }
    '/_admin/_dashboard/dashboard/items': {
      preLoaderRoute: typeof AdminDashboardDashboardItemsImport
      parentRoute: typeof AdminDashboardImport
    }
    '/_admin/_dashboard/dashboard/releases': {
      preLoaderRoute: typeof AdminDashboardDashboardReleasesImport
      parentRoute: typeof AdminDashboardImport
    }
    '/_admin/_dashboard/dashboard/settings': {
      preLoaderRoute: typeof AdminDashboardDashboardSettingsImport
      parentRoute: typeof AdminDashboardImport
    }
    '/_admin/_dashboard/dashboard/': {
      preLoaderRoute: typeof AdminDashboardDashboardIndexImport
      parentRoute: typeof AdminDashboardImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AdminRoute.addChildren([
    AdminDashboardRoute.addChildren([
      AdminDashboardDashboardAdminRoute,
      AdminDashboardDashboardItemsRoute,
      AdminDashboardDashboardReleasesRoute,
      AdminDashboardDashboardSettingsRoute,
      AdminDashboardDashboardIndexRoute,
    ]),
    AdminLoginRoute,
    AdminRecoverPasswordRoute,
    AdminResetPasswordRoute,
    AdminSignupRoute,
  ]),
  LayoutRoute.addChildren([
    LayoutAboutRoute,
    LayoutArtistsRoute,
    LayoutLabelsRoute,
    LayoutReleasesRoute,
    LayoutIndexRoute,
    LayoutArtistsSlugRoute,
    LayoutLabelsSlugRoute,
    LayoutReleasesSlugRoute,
  ]),
])

/* prettier-ignore-end */

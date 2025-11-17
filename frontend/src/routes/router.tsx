import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/routes/root-layout'
import HomePage from '@/pages/home'

// Multi-Role Login Pages
import LoginSelection from '@/pages/LoginSelection'
import CustomerLogin from '@/pages/CustomerLogin'
import ServicemanLogin from '@/pages/ServicemanLogin'
import AdminLogin from '@/pages/AdminLogin'

// Dashboards
import CustomerDashboard from '@/pages/CustomerDashboard'
import ServicemanDashboard from '@/pages/ServicemanDashboard'
import AdminDashboard from '@/pages/AdminDashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
    ]
  },
  // Login Routes
  {
    path: '/login',
    element: <LoginSelection />
  },
  {
    path: '/login/customer',
    element: <CustomerLogin />
  },
  {
    path: '/login/serviceman',
    element: <ServicemanLogin />
  },
  {
    path: '/login/admin',
    element: <AdminLogin />
  },
  // Dashboard Routes
  {
    path: '/dashboard/customer',
    element: <CustomerDashboard />
  },
  {
    path: '/dashboard/serviceman',
    element: <ServicemanDashboard />
  },
  {
    path: '/dashboard/admin',
    element: <AdminDashboard />
  }
])

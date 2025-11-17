import { Outlet } from 'react-router-dom'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'

export default function AppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

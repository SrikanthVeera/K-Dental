import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, User2, Search } from 'lucide-react'

export default function SiteHeader() {
  const [q, setQ] = useState('')
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-border">
      <div className="container py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold">K</div>
          <span className="font-display text-2xl">K-Dental</span>
        </Link>

        <div className="flex-1" />

        <div className="hidden md:flex items-center max-w-xl w-full">
          <div className="relative flex-1">
            <input
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              placeholder="Search dental products, brands, doctors..."
              className="w-full rounded-l-xl border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          </div>
          <button className="bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-r-xl">Search</button>
        </div>

        <nav className="flex items-center gap-3">
          <Link to="/wishlist" className="p-2 rounded-lg hover:bg-muted">
            <Heart className="h-5 w-5" />
          </Link>
          <Link to="/account" className="p-2 rounded-lg hover:bg-muted">
            <User2 className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="p-2 rounded-lg hover:bg-muted relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 text-[10px] bg-primary text-white rounded-full w-4 h-4 grid place-items-center">0</span>
          </Link>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="container py-2 text-sm text-slate-700 flex items-center gap-6 overflow-x-auto">
          <Link to="/shop">Shop All</Link>
          <Link to="/category/consumables">Consumables</Link>
          <Link to="/category/endodontics">Endodontics</Link>
          <Link to="/category/orthodontics">Orthodontics</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <Link to="/help">Help</Link>
        </div>
      </div>
    </header>
  )
}

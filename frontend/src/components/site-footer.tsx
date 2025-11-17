export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="font-display text-2xl mb-2">K-Dental</div>
          <p className="subtle">Premium supplies and appointments for modern clinics.</p>
        </div>
        <div>
          <div className="font-semibold mb-3">Shop</div>
          <ul className="space-y-2 text-sm">
            <li>Consumables</li>
            <li>Endodontics</li>
            <li>Orthodontics</li>
            <li>Equipment</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Company</div>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Contact</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Legal</div>
          <ul className="space-y-2 text-sm">
            <li>Terms</li>
            <li>Privacy</li>
            <li>Returns</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container py-4 text-sm subtle">© {new Date().getFullYear()} K-Dental</div>
      </div>
    </footer>
  )
}

import { Link } from 'react-router-dom'

export default function NavMega() {
  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      <div>
        <div className="font-semibold mb-2">Consumables</div>
        <ul className="space-y-1 text-sm">
          <li><Link to="/category/cements">Cements</Link></li>
          <li><Link to="/category/burs">Burs</Link></li>
          <li><Link to="/category/adhesives">Adhesives</Link></li>
        </ul>
      </div>
      <div>
        <div className="font-semibold mb-2">Endodontics</div>
        <ul className="space-y-1 text-sm">
          <li><Link to="/category/rotary-files">Rotary Files</Link></li>
          <li><Link to="/category/irrigants">Irrigants</Link></li>
          <li><Link to="/category/obturation">Obturation</Link></li>
        </ul>
      </div>
      <div>
        <div className="font-semibold mb-2">Orthodontics</div>
        <ul className="space-y-1 text-sm">
          <li><Link to="/category/brackets">Brackets</Link></li>
          <li><Link to="/category/wires">Wires</Link></li>
          <li><Link to="/category/elastics">Elastics</Link></li>
        </ul>
      </div>
    </div>
  )
}

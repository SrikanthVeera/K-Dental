import { Home, ShoppingCart, User, Grid2X2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t md:hidden flex justify-around py-2 z-50">
      <Link to="/" className="flex flex-col items-center text-sm">
        <Home size={20}/> Home
      </Link>
      <button className="flex flex-col items-center text-sm">
        <Grid2X2 size={20}/> Categories
      </button>
      <Link to="/cart" className="flex flex-col items-center text-sm">
        <ShoppingCart size={20}/> Cart
      </Link>
      <Link to="/login" className="flex flex-col items-center text-sm">
        <User size={20}/> Login
      </Link>
    </div>
  );
}

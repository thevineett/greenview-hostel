import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-8 py-4 md:px-16 bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50 shadow-sm">
      <Link to="/" className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center shadow-md shadow-green-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="white" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
          </svg>
        </div>
        <div>
          <span className="font-bold text-green-800 text-lg leading-none block" style={{fontFamily:'Outfit,sans-serif'}}>Greenview</span>
          <span className="text-green-500 text-xs leading-none">Hostel Management</span>
        </div>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-1">
        {[["About","/about"],["Contact","/contact"],["Request","/auth/request"]].map(([label,to]) => (
          <Link key={to} to={to} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all">{label}</Link>
        ))}
        <Link to="/auth/admin-login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all">Admin Login</Link>
        <Link to="/auth/login" className="ml-2 px-5 py-2 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded-xl transition-all shadow-md shadow-green-200">
          Student Login
        </Link>
      </div>

      {/* Mobile menu button */}
      <button className="md:hidden p-2 rounded-xl hover:bg-green-50 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-700">
          <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"}/>
        </svg>
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-green-100 shadow-lg md:hidden px-6 py-4 flex flex-col gap-2">
          {[["About","/about"],["Contact","/contact"],["Request","/auth/request"],["Admin Login","/auth/admin-login"]].map(([label,to]) => (
            <Link key={to} to={to} onClick={() => setMenuOpen(false)} className="py-2 px-3 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all">{label}</Link>
          ))}
          <Link to="/auth/login" onClick={() => setMenuOpen(false)} className="py-2 px-3 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded-xl text-center transition-all">
            Student Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export { Navbar };

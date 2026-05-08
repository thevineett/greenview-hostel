import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

Sidebar.propTypes = { links: PropTypes.array.isRequired };

function Sidebar({ links }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const logout = () => {
    ["student","admin","hostel","token"].forEach(k => localStorage.removeItem(k));
    navigate("/");
  };

  useEffect(() => {
    const h = () => { if (window.innerWidth >= 768) setIsOpen(true); };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  return (
    <div>
      <button
        className={`fixed flex md:hidden z-50 top-20 left-4 bg-green-600 p-2 rounded-full shadow-lg text-white transition-transform duration-300 ${isOpen ? "translate-x-52" : "translate-x-0"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen
          ? <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          : <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18"/></svg>
        }
      </button>

      <div className={`flex flex-col justify-between h-screen w-64 fixed md:static z-40 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`} style={{background:"#0f1a12"}}>
        
        <div>
          <Link to={`/${(links[0]?.for || "student")}-dashboard`} className="flex items-center gap-3 px-6 py-5 border-b border-green-900/60">
            <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="white" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Greenview</p>
              <p className="text-green-400 text-xs">Hostel</p>
            </div>
          </Link>

          <nav className="mt-4 px-3 flex flex-col gap-1">
            {links.map((link) => {
              const active = location.pathname === link.url;
              return (
                <Link key={link.text} to={link.url}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${active ? "bg-green-500 text-white shadow-lg shadow-green-900/40" : "text-green-300 hover:bg-green-900/40 hover:text-white"}`}>
                  <span className={active ? "text-white" : "text-green-400"}>{link.svg}</span>
                  {link.text}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-3 pb-5">
          <div className="border-t border-green-900/60 pt-4">
            <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
              </svg>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Sidebar };

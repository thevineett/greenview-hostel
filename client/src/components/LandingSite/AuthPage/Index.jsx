import { Outlet, Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none"/>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 justify-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="white" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
            </svg>
          </div>
          <div>
            <p className="font-bold text-green-800 text-lg leading-none" style={{fontFamily:'Outfit,sans-serif'}}>Greenview Hostel</p>
            <p className="text-green-500 text-xs">Management System</p>
          </div>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

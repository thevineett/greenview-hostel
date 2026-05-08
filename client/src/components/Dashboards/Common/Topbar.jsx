import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

Topbar.propTypes = { name: PropTypes.string, notifications: PropTypes.array };

function Topbar({ name, notifications }) {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const logout = () => {
    ["admin","hostel","student","token"].forEach(k => localStorage.removeItem(k));
    navigate("/");
  };

  useEffect(() => {
    const t = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="py-3 px-6 flex items-center justify-between w-full bg-white border-b border-green-100 shadow-sm absolute top-0 md:w-[calc(100%-256px)] md:ml-64 z-30">
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span className="text-green-700 text-sm font-medium">{date.toLocaleTimeString()}</span>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
          </svg>
          <span className="text-green-700 text-sm font-medium">{date.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative group cursor-pointer">
          <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-green-50 hover:bg-green-100 transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
            </svg>
            {notifications?.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{notifications.length}</span>
            )}
          </div>
          {notifications?.length > 0 && (
            <div className="absolute right-0 top-12 bg-white border border-green-100 shadow-xl rounded-2xl w-80 hidden group-hover:block overflow-hidden">
              <div className="px-4 py-3 bg-green-50 border-b border-green-100">
                <p className="text-sm font-semibold text-green-800">Account Requests</p>
              </div>
              <ul>
                {notifications.map((n) => (
                  <li key={n} className="px-4 py-3 text-sm text-gray-700 border-b border-gray-50 hover:bg-green-50 transition-colors">
                    New request from student <span className="font-semibold text-green-700">#{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Settings */}
        <Link to="settings">
          <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
        </Link>

        {/* User avatar */}
        <div className="relative group cursor-pointer">
          <div className="flex items-center gap-2 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-xl transition-colors">
            <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center text-white text-xs font-bold">
              {name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <span className="text-green-800 text-sm font-medium hidden md:block">{name}</span>
          </div>
          <div className="absolute right-0 top-12 bg-white border border-green-100 shadow-xl rounded-2xl w-40 hidden group-hover:block overflow-hidden">
            <Link to="settings" className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition-colors">Settings</Link>
            <button onClick={logout} className="w-full text-left block px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Topbar };

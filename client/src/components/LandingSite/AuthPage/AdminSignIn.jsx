import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from "../../Dashboards/Common/Loader";

export default function AdminSignIn() {
  let navigate = useNavigate();
  const [inputEmail, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loader, setLoader] = useState(false);

  const getHostel = async () => {
    let admin = JSON.parse(localStorage.getItem("admin"));
    try {
      const res = await fetch("http://localhost:3000/api/admin/get-hostel", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ id: admin._id }),
      });
      const data = await res.json();
      localStorage.setItem("hostel", JSON.stringify(data.hostel));
    } catch (e) {}
  };

  let login = async (event) => {
    event.preventDefault();
    setLoader(true);
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ email: inputEmail, password: pass }),
    });
    const result = await res.json();
    if (result.success) {
      localStorage.setItem("token", result.data.token);
      const ar = await fetch("http://localhost:3000/api/admin/get-admin", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ isAdmin: result.data.user.isAdmin, token: result.data.token }),
      });
      const adminResult = await ar.json();
      if (adminResult.success) {
        localStorage.setItem("admin", JSON.stringify(adminResult.admin));
        await getHostel();
        navigate("/admin-dashboard");
      } else {
        toast.error(adminResult.errors[0].msg, { position:"top-right", autoClose:3000, theme:"light" });
      }
    } else {
      toast.error(result.errors[0].msg, { position:"top-right", autoClose:3000, theme:"light" });
    }
    setLoader(false);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
          Admin Access
        </div>
        <h1 className="text-2xl font-bold text-gray-800" style={{fontFamily:'Outfit,sans-serif'}}>Admin Sign In</h1>
        <p className="text-gray-500 text-sm mt-1">Sign in to manage Greenview Hostel</p>
      </div>
      <form className="space-y-4" onSubmit={login}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Admin Email</label>
          <input type="email" required placeholder="admin@greenview.com" value={inputEmail} onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm transition-all bg-gray-50 focus:bg-white"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
          <input type="password" required placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm transition-all bg-gray-50 focus:bg-white"/>
        </div>
        <button type="submit" className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all shadow-md shadow-green-200 mt-2 flex items-center justify-center gap-2">
          {loader ? <><Loader /> Verifying...</> : "Sign In as Admin"}
        </button>
        <p className="text-sm text-center text-gray-500 pt-1">
          Not an admin?{" "}
          <Link to="/auth/login" className="text-green-600 font-semibold hover:underline">Student login</Link>
        </p>
      </form>
      <ToastContainer position="top-right" autoClose={3000} theme="light"/>
    </div>
  );
}

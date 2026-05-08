import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { verifysession } from "../../../utils/";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from "../../Dashboards/Common/Loader";

export default function SignIn() {
  let navigate = useNavigate();
  if (localStorage.getItem("token")) verifysession();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loader, setLoader] = useState(false);

  let login = async (event) => {
    event.preventDefault();
    setLoader(true);
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ email, password: pass }),
    });
    const result = await res.json();
    if (result.success) {
      localStorage.setItem("token", result.data.token);
      const sr = await fetch("http://localhost:3000/api/student/get-student", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ isAdmin: result.data.user.isAdmin, token: result.data.token }),
      });
      const studentResult = await sr.json();
      if (studentResult.success) {
        localStorage.setItem("student", JSON.stringify(studentResult.student));
        navigate("/student-dashboard");
      }
    } else {
      toast.error(result.errors[0].msg, { position:"top-right", autoClose:3000, theme:"light" });
    }
    setLoader(false);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800" style={{fontFamily:'Outfit,sans-serif'}}>Welcome back</h1>
        <p className="text-gray-500 text-sm mt-1">Sign in to your student account</p>
      </div>
      <form className="space-y-4" onSubmit={login}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
          <input type="email" required placeholder="you@greenview.com" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm transition-all bg-gray-50 focus:bg-white"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
          <input type="password" required placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm transition-all bg-gray-50 focus:bg-white"/>
        </div>
        <button type="submit" className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all shadow-md shadow-green-200 mt-2 flex items-center justify-center gap-2">
          {loader ? <><Loader /> Verifying...</> : "Sign In"}
        </button>
        <p className="text-sm text-center text-gray-500 pt-1">
          No account?{" "}
          <Link to="/auth/request" className="text-green-600 font-semibold hover:underline">Request one</Link>
        </p>
      </form>
      <ToastContainer position="top-right" autoClose={3000} theme="light"/>
    </div>
  );
}

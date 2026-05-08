import { Link } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RequestAcc() {
  const [cms, setCms] = useState("");
  const [sent, setSent] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    const res = await fetch("https://greenview-hostel-backend.onrender.com/api/request/register", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ cms_id: cms }),
    });
    if (res.status === 200) {
      setSent(true);
    } else {
      const data = await res.json();
      toast.error(data.errors?.[0]?.msg || "Request failed", { position:"top-right", theme:"light" });
    }
  };

  return (
    <div className="p-8">
      {sent ? (
        <div className="flex flex-col items-center justify-center py-8">
          <span className="text-5xl mb-4">✅</span>
          <h2 className="text-xl font-bold text-gray-800" style={{fontFamily:"Outfit,sans-serif"}}>Request Sent!</h2>
          <p className="text-gray-500 text-sm mt-2 text-center">Your request has been sent to the hostel admin. You will be contacted when your account is ready.</p>
          <Link to="/auth/login" className="mt-6 text-sm text-green-600 font-semibold hover:underline">Back to Login</Link>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800" style={{fontFamily:"Outfit,sans-serif"}}>Request an Account</h1>
            <p className="text-gray-500 text-sm mt-1">Enter your CMS ID and the admin will create your account.</p>
          </div>
          <form onSubmit={register} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">CMS ID</label>
              <input type="number" required value={cms} onChange={e => setCms(e.target.value)} placeholder="e.g. 221001"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm bg-gray-50 focus:bg-white"/>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <p className="text-xs text-green-700">
                <span className="font-semibold">Note:</span> Your CMS ID is given to you by the hostel office. The admin will verify your request and set up your account.
              </p>
            </div>
            <button type="submit" className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all shadow-md shadow-green-200 text-sm">
              Send Request
            </button>
            <p className="text-sm text-center text-gray-500 pt-1">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-green-600 font-semibold hover:underline">Sign In</Link>
            </p>
          </form>
        </>
      )}
      <ToastContainer position="top-right" theme="light"/>
    </div>
  );
}

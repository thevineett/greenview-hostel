import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Settings() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));
  const hostel = JSON.parse(localStorage.getItem("hostel"));
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const changePassword = async (e) => {
    e.preventDefault();
    if (newPass !== confirm) { toast.error("Passwords do not match", { position:"top-right", theme:"light" }); return; }
    const res = await fetch("https://greenview-hostel-backend.onrender.com/api/auth/change-password", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ email: admin.email, password: oldPass, newPassword: newPass }),
    });
    const data = await res.json();
    if (data.success) { toast.success("Password changed!", { position:"top-right", autoClose:2000, theme:"light" }); setTimeout(() => navigate("/admin-dashboard"), 1500); }
    else toast.error(data.errors?.[0]?.msg || "Failed", { position:"top-right", theme:"light" });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage your account and hostel details</p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Profile Information</h2>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-green-500 text-white text-2xl font-bold flex items-center justify-center shadow-lg shadow-green-200">{admin?.name?.charAt(0)}</div>
          <div>
            <p className="font-bold text-gray-800 text-lg">{admin?.name}</p>
            <p className="text-sm text-gray-500">{admin?.email}</p>
            <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full mt-1 inline-block">Admin</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[["Contact", admin?.contact],["CNIC", admin?.cnic],["Address", admin?.address],["Hostel", hostel?.name]].map(([label, val]) => (
            <div key={label} className="bg-green-50 rounded-xl p-3">
              <p className="text-xs text-green-600 font-medium mb-0.5">{label}</p>
              <p className="text-gray-800 font-medium text-xs">{val || "—"}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Change Password</h2>
        <form onSubmit={changePassword} className="space-y-4">
          {[["Current Password", oldPass, setOldPass],["New Password", newPass, setNewPass],["Confirm New Password", confirm, setConfirm]].map(([label, val, setter]) => (
            <div key={label}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
              <input type="password" required value={val} onChange={e => setter(e.target.value)} placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm transition-all bg-gray-50 focus:bg-white"/>
            </div>
          ))}
          <button type="submit" className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all shadow-md shadow-green-200 text-sm">Update Password</button>
        </form>
      </div>
      <ToastContainer position="top-right" theme="light"/>
    </div>
  );
}

export default Settings;

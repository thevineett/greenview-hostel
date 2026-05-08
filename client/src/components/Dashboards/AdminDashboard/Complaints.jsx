import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const typeColors = {
  Maintenance: "bg-orange-100 text-orange-700", Food: "bg-yellow-100 text-yellow-700",
  Cleanliness: "bg-blue-100 text-blue-700", Electricity: "bg-purple-100 text-purple-700",
  Internet: "bg-cyan-100 text-cyan-700", Security: "bg-red-100 text-red-700",
};

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("pending");

  const load = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"))._id;
    const res = await fetch("http://localhost:3000/api/complaint/hostel", {
      method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ hostel }),
    });
    const data = await res.json();
    if (data.success) {
      setComplaints(data.complaints.map(c => ({
        id: c._id, type: c.type, title: c.title, desc: c.description,
        student: c.student?.name, room: c.student?.room_no, status: c.status,
        date: new Date(c.date).toLocaleDateString("en-US", { day:"numeric", month:"short", year:"numeric" }),
      })));
    }
  };

  const resolve = async (id) => {
    const res = await fetch("http://localhost:3000/api/complaint/resolve/", {
      method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.success) {
      setComplaints(prev => prev.map(c => c.id === id ? {...c, status:"resolved"} : c));
      toast.success("Complaint marked as resolved", { position:"top-right", autoClose:2000, theme:"light" });
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = complaints.filter(c => filter === "all" ? true : c.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Complaints</h1>
          <p className="text-gray-500 text-sm mt-0.5">{complaints.length} total · {complaints.filter(c=>c.status==="pending").length} pending</p>
        </div>
        <div className="flex gap-2">
          {["pending","resolved","all"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter===f ? "bg-green-500 text-white shadow-md shadow-green-200" : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-green-100 p-12 text-center">
          <p className="text-gray-400 text-sm">No {filter} complaints</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map(c => (
            <div key={c.id} className="bg-white rounded-2xl border border-green-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[c.type] || "bg-gray-100 text-gray-700"}`}>{c.type}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.status==="pending" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                  {c.status}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{c.title}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{c.desc}</p>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-gray-50">
                <div>
                  <p className="text-xs font-medium text-gray-700">{c.student}</p>
                  <p className="text-xs text-gray-400">Room {c.room} · {c.date}</p>
                </div>
                {c.status === "pending" && (
                  <button onClick={() => resolve(c.id)}
                    className="text-xs bg-green-50 hover:bg-green-100 text-green-700 font-semibold px-3 py-1.5 rounded-lg transition-colors">
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={2000} theme="light"/>
    </div>
  );
}

export default Complaints;

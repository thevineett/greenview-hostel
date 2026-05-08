import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const types = ["Maintenance","Food","Cleanliness","Electricity","Internet","Security","Other"];

function Complaints() {
  const [myComplaints, setMyComplaints] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Maintenance");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const student = JSON.parse(localStorage.getItem("student"));
    const res = await fetch("http://localhost:3000/api/complaint/student", {
      method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ student: student._id }),
    });
    const data = await res.json();
    if (data.success) setMyComplaints(data.complaints.map(c => ({
      id: c._id, title: c.title, desc: c.description, type: c.type, status: c.status,
      date: new Date(c.date).toLocaleDateString("en-US", { month:"short", day:"numeric" }),
    })));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const student = JSON.parse(localStorage.getItem("student"));
    const res = await fetch("http://localhost:3000/api/complaint/register", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ student: student._id, hostel: student.hostel, title, description: desc, type }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Complaint submitted!", { position:"top-right", autoClose:2000, theme:"light" });
      setTitle(""); setDesc(""); setType("Maintenance"); load();
    } else toast.error("Failed to submit", { position:"top-right", theme:"light" });
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Complaints</h1>
        <p className="text-gray-500 text-sm mt-0.5">Submit a complaint or track existing ones</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit form */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">New Complaint</h2>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select value={type} onChange={e => setType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm bg-gray-50 focus:bg-white">
                {types.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
              <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Brief title of your complaint"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm bg-gray-50 focus:bg-white"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea required rows={4} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe the issue in detail..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm resize-none bg-gray-50 focus:bg-white"/>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-all shadow-md shadow-green-200 text-sm">
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </form>
        </div>

        {/* My complaints */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">My Complaints ({myComplaints.length})</h2>
          <div className="space-y-3 overflow-y-auto max-h-96">
            {myComplaints.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No complaints submitted yet</p>
            ) : myComplaints.map(c => (
              <div key={c.id} className="p-3 border border-gray-100 rounded-xl hover:border-green-200 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-800">{c.title}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${c.status==="pending" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{c.status}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{c.desc}</p>
                <p className="text-xs text-gray-400 mt-1">{c.type} · {c.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" theme="light"/>
    </div>
  );
}

export default Complaints;

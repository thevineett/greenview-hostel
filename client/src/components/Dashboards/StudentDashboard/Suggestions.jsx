import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const student = JSON.parse(localStorage.getItem("student"));
    const res = await fetch("https://greenview-hostel-backend.onrender.com/api/suggestion/student", {
      method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ student: student._id }),
    });
    const data = await res.json();
    if (data.success) setSuggestions(data.suggestions.map(s => ({
      id: s._id, title: s.title, desc: s.description, status: s.status,
      date: new Date(s.date).toLocaleDateString("en-US", { month:"short", day:"numeric" }),
    })));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const student = JSON.parse(localStorage.getItem("student"));
    const res = await fetch("https://greenview-hostel-backend.onrender.com/api/suggestion/register", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ student: student._id, hostel: student.hostel, title, description: desc }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Suggestion submitted!", { position:"top-right", autoClose:2000, theme:"light" });
      setTitle(""); setDesc(""); load();
    } else toast.error("Failed to submit", { position:"top-right", theme:"light" });
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Suggestions</h1>
        <p className="text-gray-500 text-sm mt-0.5">Share your ideas to improve Greenview Hostel</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">New Suggestion</h2>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
              <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Add a study room"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm bg-gray-50 focus:bg-white"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea required rows={5} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Explain your suggestion in detail..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm resize-none bg-gray-50 focus:bg-white"/>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-all shadow-md shadow-green-200 text-sm">
              {loading ? "Submitting..." : "Submit Suggestion"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">My Suggestions ({suggestions.length})</h2>
          <div className="space-y-3 overflow-y-auto max-h-96">
            {suggestions.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No suggestions submitted yet</p>
            ) : suggestions.map(s => (
              <div key={s.id} className="p-3 border border-gray-100 rounded-xl hover:border-green-200 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-800">{s.title}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${s.status==="pending" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{s.status}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{s.desc}</p>
                <p className="text-xs text-gray-400 mt-1">{s.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" theme="light"/>
    </div>
  );
}

export default Suggestions;

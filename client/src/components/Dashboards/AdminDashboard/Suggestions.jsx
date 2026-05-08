import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [filter, setFilter] = useState("pending");

  const load = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"));
    const res = await fetch("https://greenview-hostel-backend.onrender.com/api/suggestion/hostel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostel: hostel._id }),
    });
    const data = await res.json();
    if (data.success)
      setSuggestions(
        data.suggestions.map((s) => ({
          id: s._id,
          title: s.title,
          desc: s.description,
          student: s.student?.name,
          room: s.student?.room_no,
          status: s.status,
          date: new Date(s.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        })),
      );
  };

  const resolve = async (id) => {
    const res = await fetch("https://greenview-hostel-backend.onrender.com/api/suggestion/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "resolved" }),
    });
    const data = await res.json();
    if (data.success) {
      setSuggestions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "resolved" } : s)),
      );
      toast.success("Marked as resolved", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = suggestions.filter((s) =>
    filter === "all" ? true : s.status === filter,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Suggestions</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {suggestions.length} total ·{" "}
            {suggestions.filter((s) => s.status === "pending").length} pending
          </p>
        </div>
        <div className="flex gap-2">
          {["pending", "resolved", "all"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === f ? "bg-green-500 text-white shadow-md shadow-green-200" : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-green-100 p-12 text-center">
          <p className="text-gray-400 text-sm">No {filter} suggestions</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-green-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-base">
                  💡
                </span>
                <span
                  className={`ml-auto text-xs font-semibold px-2.5 py-1 rounded-full ${s.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}
                >
                  {s.status}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{s.title}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-3">
                  {s.desc}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <div>
                  <p className="text-xs font-medium text-gray-700">
                    {s.student}
                  </p>
                  <p className="text-xs text-gray-400">
                    Room {s.room} · {s.date}
                  </p>
                </div>
                {s.status === "pending" && (
                  <button
                    onClick={() => resolve(s.id)}
                    className="text-xs bg-green-50 hover:bg-green-100 text-green-700 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={2000} theme="light" />
    </div>
  );
}

export default Suggestions;

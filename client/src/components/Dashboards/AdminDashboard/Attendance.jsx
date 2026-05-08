import { useEffect, useState } from "react";
import { getAllStudents } from "../../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Attendance() {
  const [unmarked, setUnmarked] = useState([]);
  const [marked, setMarked] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const markedRes = await fetch("https://greenview-hostel-backend.onrender.com/api/attendance/getHostelAttendance", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ hostel: JSON.parse(localStorage.getItem("hostel"))._id }),
    });
    const markedData = await markedRes.json();
    const markedStudents = markedData.success ? markedData.attendance.map(s => ({
      id: s.student._id, cms: s.student.cms_id, name: s.student.name, room: s.student.room_no, status: s.status,
    })) : [];
    setMarked(markedStudents);

    const all = await getAllStudents();
    const allStudents = all.students || [];
    setUnmarked(allStudents.filter(s => !markedStudents.find(m => m.id === s._id)).map(s => ({
      id: s._id, cms: s.cms_id, name: s.name, room: s.room_no, status: undefined,
    })));
    setLoading(false);
  };

  const mark = async (id, isPresent) => {
    const res = await fetch("https://greenview-hostel-backend.onrender.com/api/attendance/mark", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ student: id, status: isPresent ? "present" : "absent" }),
    });
    const data = await res.json();
    if (data.success) {
      const student = unmarked.find(s => s.id === id);
      setUnmarked(prev => prev.filter(s => s.id !== id));
      setMarked(prev => [...prev, { ...student, status: isPresent ? "present" : "absent" }]);
      toast.success("Attendance marked", { position:"top-right", autoClose:1500, theme:"light" });
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {new Date().toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric", year:"numeric" })}
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2 text-center">
            <p className="text-lg font-bold text-green-600">{marked.filter(s=>s.status==="present").length}</p>
            <p className="text-xs text-green-700">Present</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-center">
            <p className="text-lg font-bold text-red-400">{marked.filter(s=>s.status==="absent").length}</p>
            <p className="text-xs text-red-600">Absent</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-center">
            <p className="text-lg font-bold text-amber-600">{unmarked.length}</p>
            <p className="text-xs text-amber-700">Unmarked</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-green-100 p-12 text-center">
          <p className="text-gray-400 text-sm">Loading students...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Unmarked */}
          <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-amber-50 border-b border-amber-100">
              <h2 className="text-sm font-semibold text-amber-800">Pending — Mark Attendance ({unmarked.length})</h2>
            </div>
            {unmarked.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">All students marked for today ✅</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {unmarked.map(s => (
                  <div key={s.id} className="flex items-center justify-between px-5 py-3 hover:bg-green-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 text-sm font-bold flex items-center justify-center">{s.name?.charAt(0)}</div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{s.name}</p>
                        <p className="text-xs text-gray-400">CMS: {s.cms} · Room {s.room}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => mark(s.id, true)} className="text-xs bg-green-100 hover:bg-green-200 text-green-700 font-semibold px-3 py-1.5 rounded-lg transition-colors">Present</button>
                      <button onClick={() => mark(s.id, false)} className="text-xs bg-red-100 hover:bg-red-200 text-red-600 font-semibold px-3 py-1.5 rounded-lg transition-colors">Absent</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Marked */}
          <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-green-50 border-b border-green-100">
              <h2 className="text-sm font-semibold text-green-800">Marked Today ({marked.length})</h2>
            </div>
            {marked.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No attendance marked yet</p>
            ) : (
              <div className="divide-y divide-gray-50 overflow-y-auto max-h-80">
                {marked.map(s => (
                  <div key={s.id} className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center ${s.status==="present" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>{s.name?.charAt(0)}</div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{s.name}</p>
                        <p className="text-xs text-gray-400">Room {s.room}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.status==="present" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>{s.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={1500} theme="light"/>
    </div>
  );
}

export default Attendance;

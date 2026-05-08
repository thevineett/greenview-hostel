import { useState, useEffect } from "react";
import { getAllStudents } from "../../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const getCSV = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"))._id;
    const res = await fetch("http://localhost:3000/api/student/csv", {
      method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ hostel }),
    });
    const data = await res.json();
    if (data.success) {
      const link = document.createElement("a");
      link.href = "data:text/csv;charset=utf-8," + escape(data.csv);
      link.download = "greenview-students.csv";
      link.click();
      toast.success("CSV Downloaded!", { position:"top-right", autoClose:2000, theme:"light" });
    }
  };

  const deleteStudent = async (id) => {
    if (!confirm("Delete this student?")) return;
    const res = await fetch("http://localhost:3000/api/student/delete-student", {
      method:"DELETE", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.success) {
      setStudents(prev => prev.filter(s => s._id !== id));
      toast.success("Student removed", { position:"top-right", autoClose:2000, theme:"light" });
    }
  };

  useEffect(() => {
    getAllStudents().then(data => { if (data.success) setStudents(data.students); });
  }, []);

  const filtered = students.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    String(s.cms_id).includes(search) ||
    String(s.room_no).includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Students</h1>
          <p className="text-gray-500 text-sm mt-0.5">{students.length} enrolled</p>
        </div>
        <button onClick={getCSV} className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-green-200 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
          </svg>
          Export CSV
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
        </svg>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, CMS ID or room..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all"/>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-50 border-b border-green-100">
                {["Name","CMS ID","Room","Dept","Course","Batch","Contact","Action"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-10 text-gray-400 text-sm">No students found</td></tr>
              ) : filtered.map((s) => (
                <tr key={s._id} className="hover:bg-green-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 font-bold text-sm flex items-center justify-center flex-shrink-0">{s.name?.charAt(0)}</div>
                      <span className="font-medium text-gray-800 whitespace-nowrap">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{s.cms_id}</td>
                  <td className="px-4 py-3"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-lg text-xs font-medium">{s.room_no}</span></td>
                  <td className="px-4 py-3 text-gray-600">{s.dept}</td>
                  <td className="px-4 py-3 text-gray-600">{s.course}</td>
                  <td className="px-4 py-3 text-gray-600">{s.batch}</td>
                  <td className="px-4 py-3 text-gray-600">{s.contact}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => deleteStudent(s._id)} className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg transition-colors font-medium">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} theme="light"/>
    </div>
  );
}

export default AllStudents;

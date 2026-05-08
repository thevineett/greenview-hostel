import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

function Attendance() {
  const [records, setRecords] = useState([]);
  const [daysOff, setDaysOff] = useState(0);

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));
    fetch("http://localhost:3000/api/attendance/get", {
      method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ student: student._id }),
    }).then(r => r.json()).then(data => {
      if (data.success) {
        setDaysOff(data.attendance.filter(d => d.status === "absent").length);
        setRecords(data.attendance.slice().reverse().map(d => ({
          date: new Date(d.date).toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" }),
          status: d.status,
        })));
      }
    });
  }, []);

  const totalDays = new Date().getDate();
  const present = totalDays - daysOff;
  const pct = totalDays > 0 ? Math.round((present / totalDays) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
        <p className="text-gray-500 text-sm mt-0.5">Your attendance record for this month</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6 flex flex-col items-center">
          <h2 className="text-base font-semibold text-gray-800 mb-4 self-start">Overview</h2>
          <div className="w-44 h-44">
            <Doughnut
              data={{
                labels: ["Absent","Present"],
                datasets: [{ data:[daysOff, present], backgroundColor:["#fca5a5","#4ade80"], borderColor:["#f87171","#22c55e"], borderWidth:2, hoverOffset:6 }],
              }}
              options={{ plugins: { legend: { display: false } }, cutout:"70%" }}
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-4xl font-bold text-green-500">{pct}%</p>
            <p className="text-xs text-gray-500 mt-1">Attendance Rate</p>
          </div>
          <div className="mt-4 w-full grid grid-cols-2 gap-3">
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-green-600">{present}</p>
              <p className="text-xs text-green-700">Present</p>
            </div>
            <div className="bg-red-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-red-400">{daysOff}</p>
              <p className="text-xs text-red-600">Absent</p>
            </div>
          </div>
        </div>

        {/* Records list */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-green-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Daily Records</h2>
          <div className="space-y-2 overflow-y-auto max-h-96">
            {records.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No attendance records yet</p>
            ) : records.map((r, i) => (
              <div key={i} className={`flex items-center justify-between px-4 py-2.5 rounded-xl border ${r.status==="present" ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}`}>
                <span className="text-sm font-medium text-gray-700">{r.date}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.status==="present" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;

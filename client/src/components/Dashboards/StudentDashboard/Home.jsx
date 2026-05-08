import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

function Home() {
  const student = JSON.parse(localStorage.getItem("student"));
  const [daysOff, setDaysOff] = useState(0);
  const [invoices, setInvoices] = useState([]);
  const totalDays = new Date().getDate();

  useEffect(() => {
    fetch("http://localhost:3000/api/attendance/get", {
      method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ student: student._id }),
    }).then(r => r.json()).then(data => {
      if (data.success) setDaysOff(data.attendance.filter(d => d.status === "absent").length);
    });

    fetch("http://localhost:3000/api/invoice/student", {
      method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ student: student._id }),
    }).then(r => r.json()).then(data => {
      if (data.success) setInvoices(data.invoices.filter(inv => inv.status === "pending").map(inv => ({
        title: inv.title, amount: inv.amount,
        date: new Date(inv.date).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" }),
      })));
    });
  }, []);

  const present = totalDays - daysOff;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {student?.name?.split(" ")[0]} 👋</h1>
        <p className="text-gray-500 text-sm mt-0.5">Here is your dashboard at <span className="text-green-600 font-semibold">Greenview Hostel</span></p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:"Room No.", val: student?.room_no, icon:"🚪", color:"green" },
          { label:"Batch", val: student?.batch, icon:"🎓", color:"blue" },
          { label:"Department", val: student?.dept, icon:"🏛️", color:"purple" },
          { label:"Pending Invoices", val: invoices.length, icon:"📄", color:"amber" },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-2xl border border-green-100 p-4 shadow-sm">
            <span className="text-xl">{c.icon}</span>
            <p className="text-lg font-bold text-gray-800 mt-1">{c.val}</p>
            <p className="text-xs text-gray-500">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">This Month&apos;s Attendance</h2>
          <div className="flex items-center gap-6">
            <div className="w-40 h-40 flex-shrink-0">
              <Doughnut
                data={{
                  labels: ["Absent", "Present"],
                  datasets: [{ data: [daysOff, present], backgroundColor: ["#fca5a5","#4ade80"], borderColor: ["#f87171","#22c55e"], borderWidth: 2, hoverOffset: 6 }],
                }}
                options={{ plugins: { legend: { display: false } }, cutout:"72%" }}
              />
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-3xl font-bold text-green-500">{present}</p>
                <p className="text-xs text-gray-500 mt-0.5">Days Present</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-400">{daysOff}</p>
                <p className="text-xs text-gray-500 mt-0.5">Days Absent</p>
              </div>
              <div className="text-xs text-gray-400">{totalDays} days total this month</div>
            </div>
          </div>
        </div>

        {/* Pending Invoices */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Unpaid Invoices</h2>
          {invoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="text-4xl mb-2">✅</span>
              <p className="text-sm text-gray-400">All caught up! No pending invoices.</p>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-48">
              {invoices.map((inv, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{inv.title}</p>
                    <p className="text-xs text-gray-500">{inv.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-amber-700">Rs. {inv.amount?.toLocaleString()}</p>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">pending</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

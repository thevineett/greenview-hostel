import { ShortCard } from "./ShortCard";
import { List } from "./List";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getAllStudents } from "../../../../utils";
import { toast } from "react-toastify";

function Home() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const hostel = JSON.parse(localStorage.getItem("hostel"));
  const [noOfStudents, setNoOfStudents] = useState(0);
  const [complaints, setComplaints] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const getStudentCount = async () => {
    const res = await getAllStudents();
    if (res.success) setNoOfStudents(res.students.length);
  };

  const getComplaints = async () => {
    const hostelId = JSON.parse(localStorage.getItem("hostel"))._id;
    const res = await fetch("https://greenview-hostel-backend.onrender.com/api/complaint/hostel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostel: hostelId }),
    });
    const data = await res.json();
    if (data.success) setComplaints(data.complaints);
    else
      toast.error("Failed to load complaints", {
        position: "top-right",
        autoClose: 3000,
      });
  };

  const getSuggestions = async () => {
    const h = JSON.parse(localStorage.getItem("hostel"));
    const res = await fetch("https://greenview-hostel-backend.onrender.com/api/suggestion/hostel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostel: h._id }),
    });
    const data = await res.json();
    if (data.success) setSuggestions(data.suggestions);
  };

  useEffect(() => {
    getStudentCount();
    getComplaints();
    getSuggestions();
  }, []);

  // Build chart data from complaints
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const chartData = days.map((day) => ({
    name: day,
    Complaints: complaints.filter(
      (c) => days[new Date(c.date).getDay()] === day,
    ).length,
    Resolved: complaints.filter(
      (c) => days[new Date(c.date).getDay()] === day && c.status === "resolved",
    ).length,
  }));

  const pending = complaints.filter((c) => c.status === "pending").length;
  const pendingSug = suggestions.filter((s) => s.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {admin?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here is what is happening at{" "}
          <span className="text-green-600 font-semibold">Greenview Hostel</span>{" "}
          today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="flex flex-wrap gap-4">
        <ShortCard
          number={noOfStudents}
          title="Total Students"
          icon="🎓"
          color="green"
        />
        <ShortCard
          number={complaints.length}
          title="Total Complaints"
          icon="📋"
          color="blue"
        />
        <ShortCard
          number={pending}
          title="Pending Complaints"
          icon="⏳"
          color="amber"
        />
        <ShortCard
          number={pendingSug}
          title="Pending Suggestions"
          icon="💡"
          color="rose"
        />
      </div>

      {/* Chart + List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-green-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Weekly Complaints Overview
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="gComplaints" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gResolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#86efac" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#86efac" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #d1fae5",
                  fontSize: "13px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "13px" }} />
              <Area
                type="monotone"
                dataKey="Complaints"
                stroke="#16a34a"
                fill="url(#gComplaints)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="Resolved"
                stroke="#86efac"
                fill="url(#gResolved)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Mess-off / suggestions sidebar list */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Pending Suggestions
          </h2>
          <div className="space-y-3 overflow-y-auto max-h-52">
            {suggestions.filter((s) => s.status === "pending").length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">
                No pending suggestions
              </p>
            )}
            {suggestions
              .filter((s) => s.status === "pending")
              .map((s, i) => (
                <div
                  key={i}
                  className="p-3 bg-green-50 rounded-xl border border-green-100"
                >
                  <p className="text-sm font-medium text-green-800 truncate">
                    {s.title}
                  </p>
                  <p className="text-xs text-green-500 mt-0.5">
                    {new Date(s.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <List />
    </div>
  );
}

export { Home };

export default Home;

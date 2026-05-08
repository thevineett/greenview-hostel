import { useEffect, useState } from "react";

function List() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const hostel = JSON.parse(localStorage.getItem("hostel"));
    fetch("http://localhost:3000/api/messoff/list", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostel: hostel._id }),
    }).then(r => r.json()).then(data => {
      if (data.success) {
        setRequests(data.list.filter(r => r.status === "pending").slice(0, 5).map(r => ({
          id: r._id,
          name: r.student?.name || "Student",
          room: r.student?.room_no,
          from: new Date(r.leaving_date).toLocaleDateString("en-US", { month:"short", day:"numeric" }),
          to: new Date(r.return_date).toLocaleDateString("en-US", { month:"short", day:"numeric" }),
        })));
      }
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Pending Mess-Off Requests</h2>
      {requests.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">No pending requests</p>
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
            <div key={r.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-100">
              <div>
                <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                <p className="text-xs text-gray-500">Room {r.room}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-amber-700">{r.from} → {r.to}</p>
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Pending</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { List };

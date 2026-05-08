import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MessOff() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("pending");

  const load = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"));
    const res = await fetch("https://greenview-hostel-backend.onrender.com/api/messoff/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostel: hostel._id }),
    });
    const data = await res.json();
    if (data.success)
      setRequests(
        data.list.map((r) => ({
          id: r._id,
          name: r.student?.name,
          room: r.student?.room_no,
          from: new Date(r.leaving_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          to: new Date(r.return_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          reqDate: new Date(r.request_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          status: r.status,
        })),
      );
  };

  const updateStatus = async (id, status) => {
    const res = await fetch(`https://greenview-hostel-backend.onrender.com/api/messoff/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const data = await res.json();
    if (data.success) {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r)),
      );
      toast.success(`Request ${status}`, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = requests.filter((r) =>
    filter === "all" ? true : r.status === filter,
  );

  const statusStyle = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Mess-Off Requests
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {requests.filter((r) => r.status === "pending").length} pending
            approval
          </p>
        </div>
        <div className="flex gap-2">
          {["pending", "approved", "rejected", "all"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all ${filter === f ? "bg-green-500 text-white shadow-md shadow-green-200" : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-50 border-b border-green-100">
                {[
                  "Student",
                  "Room",
                  "Requested",
                  "Leave Period",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-400 text-sm"
                  >
                    No {filter} requests
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-green-50/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 font-bold text-sm flex items-center justify-center">
                          {r.name?.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800">
                          {r.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-lg text-xs font-medium">
                        {r.room}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {r.reqDate}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-gray-700">
                        {r.from}
                      </span>
                      <span className="text-gray-400 mx-1">→</span>
                      <span className="text-xs font-medium text-gray-700">
                        {r.to}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[r.status]}`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {r.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(r.id, "approved")}
                            className="text-xs bg-green-50 hover:bg-green-100 text-green-700 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(r.id, "rejected")}
                            className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} theme="light" />
    </div>
  );
}

export default MessOff;

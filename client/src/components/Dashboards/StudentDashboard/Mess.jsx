import { useEffect, useState } from "react";
import "chart.js/auto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Mess() {
  const [leaveDate, setLeaveDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [myRequests, setMyRequests] = useState([]);

  const loadRequests = async () => {
    const student = JSON.parse(localStorage.getItem("student"));
    const res = await fetch("http://localhost:3000/api/messoff/count", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student: student._id }),
    });
    const data = await res.json();
    if (data.success)
      setMyRequests(
        data.list.map((r) => ({
          id: r._id,
          status: r.status,
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
        })),
      );
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const student = JSON.parse(localStorage.getItem("student"));
    const res = await fetch("http://localhost:3000/api/Messoff/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student: student._id,
        leaving_date: leaveDate,
        return_date: returnDate,
      }),
    });
    const result = await res.json();
    if (result.success) {
      toast.success("Mess-off requested!", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      setLeaveDate("");
      setReturnDate("");
      loadRequests();
    } else
      toast.error("Failed to submit request", {
        position: "top-right",
        theme: "light",
      });
    setLoading(false);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const statusStyle = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Mess-Off Request</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Apply for mess leave and track your requests
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-2">
            New Request
          </h2>
          <p className="text-xs text-gray-500 mb-5">
            Fill in the dates you will be away from the hostel mess.
          </p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Leaving Date
              </label>
              <input
                type="date"
                required
                value={leaveDate}
                onChange={(e) => setLeaveDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm bg-gray-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Return Date
              </label>
              <input
                type="date"
                required
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm bg-gray-50 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-all shadow-md shadow-green-200 text-sm"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            My Requests ({myRequests.length})
          </h2>
          <div className="space-y-3 overflow-y-auto max-h-80">
            {myRequests.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">
                No mess-off requests yet
              </p>
            ) : (
              myRequests.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-green-200 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {r.from} → {r.to}
                    </p>
                    <p className="text-xs text-gray-400">
                      Requested on {r.reqDate}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[r.status]}`}
                  >
                    {r.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" theme="light" />
    </div>
  );
}

export default Mess;

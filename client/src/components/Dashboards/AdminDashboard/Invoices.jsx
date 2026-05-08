import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState("all");

  const load = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"));
    const res = await fetch("https://greenview-hostel-backend.onrender.com/api/invoice/getbyid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostel: hostel._id }),
    });
    const data = await res.json();
    if (data.success)
      setInvoices(
        data.invoices.map((inv) => ({
          id: inv._id,
          title: inv.title,
          amount: inv.amount,
          student: inv.student?.name,
          room: inv.student?.room_no,
          status: inv.status,
          date: new Date(inv.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        })),
      );
  };

  const generate = async () => {
    const hostel = JSON.parse(localStorage.getItem("hostel"));
    const res = await fetch("https://greenview-hostel-backend.onrender.com/api/invoice/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostel: hostel._id }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Invoices generated!", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      load();
    } else
      toast.error("Failed to generate", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = invoices.filter((inv) =>
    filter === "all" ? true : inv.status === filter,
  );
  const total = invoices.reduce((s, inv) => s + inv.amount, 0);
  const pending = invoices
    .filter((inv) => inv.status !== "paid")
    .reduce((s, inv) => s + inv.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {invoices.length} total invoices
          </p>
        </div>
        <button
          onClick={generate}
          className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-green-200 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Generate Invoices
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Invoices", val: invoices.length, color: "green" },
          {
            label: "Total Amount",
            val: `Rs. ${total.toLocaleString()}`,
            color: "blue",
          },
          {
            label: "Pending Amount",
            val: `Rs. ${pending.toLocaleString()}`,
            color: "amber",
          },
          {
            label: "Paid",
            val: invoices.filter((i) => i.status === "paid").length,
            color: "emerald",
          },
        ].map((c) => (
          <div
            key={c.label}
            className={`bg-white rounded-2xl border border-green-100 p-4 shadow-sm`}
          >
            <p className="text-xs text-gray-500 font-medium">{c.label}</p>
            <p className="text-xl font-bold text-gray-800 mt-1">{c.val}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {["all", "pending", "paid"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter === f ? "bg-green-500 text-white shadow-md shadow-green-200" : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-50 border-b border-green-100">
                {["Student", "Room", "Invoice", "Amount", "Date", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-400 text-sm"
                  >
                    No invoices found
                  </td>
                </tr>
              ) : (
                filtered.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-green-50/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {inv.student}
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-lg text-xs font-medium">
                        {inv.room}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{inv.title}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      Rs. {inv.amount?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {inv.date}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${inv.status === "paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                      >
                        {inv.status}
                      </span>
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

export default Invoices;

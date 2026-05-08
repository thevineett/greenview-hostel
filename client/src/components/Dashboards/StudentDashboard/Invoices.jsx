import { useState, useEffect } from "react";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));
    fetch("https://greenview-hostel-backend.onrender.com/api/invoice/student", {
      method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ student: student._id }),
    }).then(r => r.json()).then(data => {
      if (data.success) setInvoices(data.invoices.map(inv => ({
        id: inv._id, title: inv.title, amount: inv.amount, status: inv.status,
        date: new Date(inv.date).toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" }),
      })));
    });
  }, []);

  const filtered = invoices.filter(inv => filter === "all" ? true : inv.status === filter);
  const total = invoices.reduce((s,i) => s + i.amount, 0);
  const paid = invoices.filter(i => i.status === "paid").reduce((s,i) => s + i.amount, 0);
  const pending = invoices.filter(i => i.status !== "paid").reduce((s,i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Invoices</h1>
        <p className="text-gray-500 text-sm mt-0.5">{invoices.length} total invoices</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[["Total", `Rs. ${total.toLocaleString()}`, "bg-green-50 border-green-200 text-green-800"],["Paid", `Rs. ${paid.toLocaleString()}`, "bg-emerald-50 border-emerald-200 text-emerald-800"],["Pending", `Rs. ${pending.toLocaleString()}`, "bg-amber-50 border-amber-200 text-amber-800"]].map(([label, val, style]) => (
          <div key={label} className={`rounded-2xl border p-4 ${style}`}>
            <p className="text-xs font-medium opacity-70">{label}</p>
            <p className="text-lg font-bold mt-1">{val}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {["all","pending","paid"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${filter===f ? "bg-green-500 text-white shadow-md shadow-green-200" : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-green-100 p-12 text-center">
            <p className="text-gray-400 text-sm">No {filter} invoices</p>
          </div>
        ) : filtered.map(inv => (
          <div key={inv.id} className="bg-white rounded-2xl border border-green-100 shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${inv.status==="paid" ? "bg-green-100" : "bg-amber-100"}`}>
                {inv.status === "paid" ? "✅" : "📄"}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{inv.title}</p>
                <p className="text-xs text-gray-500">{inv.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">Rs. {inv.amount?.toLocaleString()}</p>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${inv.status==="paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{inv.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Invoices;

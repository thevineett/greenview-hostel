import { useState } from "react";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterStudent() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    cms_id: "",
    room_no: "",
    batch: "",
    dept: "",
    course: "",
    email: "",
    father_name: "",
    contact: "",
    address: "",
    dob: "",
    cnic: "",
    password: "",
  });

  const change = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const hostel = JSON.parse(localStorage.getItem("hostel")).name;
    try {
      const res = await fetch(
        "https://greenview-hostel-backend.onrender.com/api/student/register-student",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, hostel }),
        },
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Student registered!", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });
        setForm({
          name: "",
          cms_id: "",
          room_no: "",
          batch: "",
          dept: "",
          course: "",
          email: "",
          father_name: "",
          contact: "",
          address: "",
          dob: "",
          cnic: "",
          password: "",
        });
      } else
        toast.error(data.errors?.[0]?.msg || "Registration failed", {
          position: "top-right",
          theme: "light",
        });
    } catch {
      toast.error("Server error", { position: "top-right", theme: "light" });
    }
    setLoading(false);
  };

  const fields = [
    [
      ["Full Name", "name", "text", "Aryan Kapoor"],
      ["CMS ID", "cms_id", "number", "221001"],
    ],
    [
      ["Room Number", "room_no", "number", "101"],
      ["Batch Year", "batch", "number", "2022"],
    ],
    [
      ["Department", "dept", "text", "SEECS"],
      ["Course", "course", "text", "CS"],
    ],
    [
      ["Email", "email", "email", "student@greenview.com"],
      ["Father's Name", "father_name", "text", "Father Name"],
    ],
    [
      ["Contact", "contact", "text", "03111111101"],
      ["CNIC", "cnic", "text", "3520211111011"],
    ],
    [
      ["Date of Birth", "dob", "date", ""],
      ["Address", "address", "text", "City, India"],
    ],
    [["Password", "password", "password", ""]],
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Register Student</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Add a new student to Greenview Hostel
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
        <form onSubmit={submit} className="space-y-4">
          {fields.map((row, ri) => (
            <div
              key={ri}
              className={`grid gap-4 ${row.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}
            >
              {row.map(([label, name, type, placeholder]) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                  </label>
                  <input
                    type={type}
                    required
                    value={form[name]}
                    onChange={change(name)}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm transition-all bg-gray-50 focus:bg-white"
                  />
                </div>
              ))}
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-all shadow-md shadow-green-200 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader /> Registering...
              </>
            ) : (
              "Register Student"
            )}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" theme="light" />
    </div>
  );
}

export default RegisterStudent;

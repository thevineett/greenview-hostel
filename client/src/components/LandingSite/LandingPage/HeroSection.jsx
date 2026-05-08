import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col items-center justify-center px-8 py-16 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2 pointer-events-none"/>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2 pointer-events-none"/>

      {/* Badge */}
      <div className="flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-8 border border-green-200">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
        Greenview Hostel Management System
      </div>

      {/* Heading */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center leading-tight max-w-3xl" style={{fontFamily:'Outfit,sans-serif'}}>
        Manage Your Hostel{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
          Smarter
        </span>
      </h1>

      <p className="mt-6 text-lg md:text-xl text-gray-500 text-center max-w-xl leading-relaxed">
        One unified platform for attendance, invoices, complaints, mess-off requests and more — built for Greenview Hostel.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
        <Link to="/auth/login" className="px-8 py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl shadow-lg shadow-green-200 transition-all hover:scale-105 text-base">
          Student Login
        </Link>
        <Link to="/auth/admin-login" className="px-8 py-3.5 bg-white hover:bg-green-50 text-green-700 font-semibold rounded-2xl border border-green-200 shadow-sm transition-all hover:scale-105 text-base">
          Admin Login
        </Link>
      </div>

      <Link to="/auth/request" className="mt-5 text-sm text-gray-400 hover:text-green-600 transition-colors underline underline-offset-4">
        Request a student account
      </Link>

      {/* Feature pills */}
      <div className="mt-16 flex flex-wrap justify-center gap-3">
        {["Attendance Tracking","Mess Fee Invoices","Complaint Management","Mess-Off Requests","Suggestions Board","CSV Export"].map((f) => (
          <span key={f} className="px-4 py-2 bg-white border border-green-100 rounded-full text-sm text-green-700 font-medium shadow-sm">
            ✓ {f}
          </span>
        ))}
      </div>
    </main>
  );
}

export { HeroSection };

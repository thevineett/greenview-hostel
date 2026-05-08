function About() {
  const team = [
    {
      name: "VINEET KUMAR",
      role: "Full-Stack Developer",
      emoji: "💻",
      color: "bg-blue-100 text-blue-700",
    },
  ];

  const features = [
    {
      icon: "🎓",
      title: "Student Management",
      desc: "Register and manage all hostel residents with full profile support.",
    },
    {
      icon: "📋",
      title: "Attendance Tracking",
      desc: "Mark and monitor daily attendance with visual reports.",
    },
    {
      icon: "💬",
      title: "Complaints & Suggestions",
      desc: "A proper channel for students to raise issues and share ideas.",
    },
    {
      icon: "📄",
      title: "Invoice Management",
      desc: "Generate and track mess fee invoices for all students.",
    },
    {
      icon: "🍽️",
      title: "Mess-Off Requests",
      desc: "Students can apply for mess leave and admins can approve instantly.",
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      desc: "Charts and stats give admins a quick overview of hostel health.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-20">
      {/* Hero */}
      <div className="text-center py-16 px-6">
        <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-green-200">
          🌿 About Greenview Hostel
        </span>
        <h1
          className="text-4xl md:text-5xl font-bold text-gray-800 max-w-2xl mx-auto"
          style={{ fontFamily: "Outfit,sans-serif" }}
        >
          Built to make hostel life{" "}
          <span className="text-green-500">easier</span>
        </h1>
        <p className="mt-5 text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
          The Greenview Hostel Management System is a full-stack MERN
          application that digitizes every aspect of hostel administration and
          student experience.
        </p>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <h2
          className="text-2xl font-bold text-gray-800 text-center mb-8"
          style={{ fontFamily: "Outfit,sans-serif" }}
        >
          What the system does
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl border border-green-100 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <span className="text-2xl">{f.icon}</span>
              <h3 className="font-bold text-gray-800 mt-2 text-sm">
                {f.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="max-w-5xl mx-auto px-6">
        <h2
          className="text-2xl font-bold text-gray-800 text-center mb-8"
          style={{ fontFamily: "Outfit,sans-serif" }}
        >
          Meet the person behind this idea
        </h2>
        <div className="flex flex-wrap justify-center gap-5">
          {team.map((m) => (
            <div
              key={m.name}
              className="bg-white rounded-2xl border border-green-100 shadow-sm p-6 w-48 flex flex-col items-center text-center hover:shadow-md transition-shadow hover:-translate-y-1 transition-transform duration-200"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${m.color} flex items-center justify-center text-2xl mb-3`}
              >
                {m.emoji}
              </div>
              <p className="font-bold text-gray-800 text-sm">{m.name}</p>
              <p className="text-xs text-gray-500 mt-1">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { About };

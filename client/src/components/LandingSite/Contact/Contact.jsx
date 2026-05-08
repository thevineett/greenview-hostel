import { useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    emailjs
      .send(
        "service_0efzx8m",
        "template_3ref3vd",
        { email, subject, message },
        "Tew9A-B-c5W2S7CYH",
      )
      .then(() => {
        setIsSending(false);
        setIsSent(true);
      })
      .catch(() => setIsSending(false));
  };

  const contacts = [
    { icon: "📍", label: "Address", val: "Block A, Campus Road, Delhi" },
    { icon: "📞", label: "Phone", val: "+91 **0 1234554" },
    { icon: "✉️", label: "Email", val: "admin@greenview.com" },
    { icon: "🕐", label: "Office Hours", val: "Mon–Fri, 9am–5pm" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-20">
      <div className="text-center py-16 px-6">
        <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-green-200">
          📬 Get in Touch
        </span>
        <h1
          className="text-4xl md:text-5xl font-bold text-gray-800 max-w-xl mx-auto"
          style={{ fontFamily: "Outfit,sans-serif" }}
        >
          Contact <span className="text-green-500">Greenview Hostel</span>
        </h1>
        <p className="mt-4 text-gray-500 max-w-md mx-auto">
          Have a question or issue? We are here to help. Send us a message and
          we will get back to you.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Info */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
            <h2 className="text-base font-bold text-gray-800 mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              {contacts.map((c) => (
                <div key={c.label} className="flex items-start gap-3">
                  <span className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                    {c.icon}
                  </span>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      {c.label}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {c.val}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-green-500 rounded-2xl p-6 text-white">
            <h3
              className="font-bold text-lg mb-2"
              style={{ fontFamily: "Outfit,sans-serif" }}
            >
              Greenview Hostel
            </h3>
            <p className="text-green-100 text-sm leading-relaxed">
              A modern hostel management system built with the MERN stack.
              Providing a digital experience for students and administrators
              alike.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6">
          {isSent ? (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <span className="text-5xl mb-4">✅</span>
              <h3 className="text-lg font-bold text-gray-800">Message Sent!</h3>
              <p className="text-gray-500 text-sm mt-2 text-center">
                We have received your message and will get back to you shortly.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-base font-bold text-gray-800 mb-4">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm bg-gray-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="How can we help?"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm bg-gray-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none text-sm resize-none bg-gray-50 focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-2.5 bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-all shadow-md shadow-green-200 text-sm"
                >
                  {isSending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { Contact };

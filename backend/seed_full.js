const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// ─── SCHEMAS ─────────────────────────────────────────────────────────────────
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  isAdmin: Boolean,
  date: { type: Date, default: Date.now },
});
const HostelSchema = new mongoose.Schema({
  name: String,
  location: String,
  rooms: Number,
  capacity: Number,
  vacant: Number,
});
const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  father_name: String,
  contact: String,
  address: String,
  dob: Date,
  cnic: String,
  user: mongoose.Schema.Types.ObjectId,
  hostel: mongoose.Schema.Types.ObjectId,
  date: { type: Date, default: Date.now },
});
const StudentSchema = new mongoose.Schema({
  name: String,
  cms_id: Number,
  room_no: Number,
  batch: Number,
  dept: String,
  course: String,
  email: String,
  father_name: String,
  contact: String,
  address: String,
  dob: Date,
  cnic: String,
  user: mongoose.Schema.Types.ObjectId,
  hostel: mongoose.Schema.Types.ObjectId,
  date: { type: Date, default: Date.now },
});
const AttendanceSchema = new mongoose.Schema({
  student: mongoose.Schema.Types.ObjectId,
  date: { type: Date, default: Date.now },
  status: String,
});
const ComplaintSchema = new mongoose.Schema({
  student: mongoose.Schema.Types.ObjectId,
  hostel: mongoose.Schema.Types.ObjectId,
  type: String,
  title: String,
  description: String,
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now },
});
const InvoiceSchema = new mongoose.Schema({
  student: mongoose.Schema.Types.ObjectId,
  title: { type: String, default: "Mess Fee" },
  amount: Number,
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now },
});
const MessOffSchema = new mongoose.Schema({
  student: mongoose.Schema.Types.ObjectId,
  leaving_date: Date,
  return_date: Date,
  status: { type: String, default: "pending" },
  request_date: { type: Date, default: Date.now },
});
const SuggestionSchema = new mongoose.Schema({
  student: mongoose.Schema.Types.ObjectId,
  hostel: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("user", UserSchema);
const Hostel = mongoose.model("hostel", HostelSchema);
const Admin = mongoose.model("admin", AdminSchema);
const Student = mongoose.model("student", StudentSchema);
const Attendance = mongoose.model("attendance", AttendanceSchema);
const Complaint = mongoose.model("complaint", ComplaintSchema);
const Invoice = mongoose.model("invoice", InvoiceSchema);
const MessOff = mongoose.model("messoff", MessOffSchema);
const Suggestion = mongoose.model("suggestion", SuggestionSchema);

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  // Clear all collections
  await Promise.all([
    User.deleteMany({}),
    Hostel.deleteMany({}),
    Admin.deleteMany({}),
    Student.deleteMany({}),
    Attendance.deleteMany({}),
    Complaint.deleteMany({}),
    Invoice.deleteMany({}),
    MessOff.deleteMany({}),
    Suggestion.deleteMany({}),
  ]);
  console.log("All collections cleared");

  const salt = await bcrypt.genSalt(10);

  // ── 1. HOSTEL ─────────────────────────────────────────────────────────────
  const hostel = await Hostel.create({
    name: "Greenview Hostel",
    location: "Block C, Main Campus Road",
    rooms: 80,
    capacity: 160,
    vacant: 12,
  });
  console.log("Hostel created:", hostel.name);

  // ── 2. ADMIN ──────────────────────────────────────────────────────────────
  const adminUser = await User.create({
    email: "admin@greenview.com",
    password: await bcrypt.hash("admin1234", salt),
    isAdmin: true,
  });
  await Admin.create({
    name: "Rajesh Sharma",
    email: "admin@greenview.com",
    father_name: "Mohan Sharma",
    contact: "03001234567",
    address: "House 12, Sector 25, Delhi",
    dob: new Date("1985-06-15"),
    cnic: "3520112345671",
    user: adminUser._id,
    hostel: hostel._id,
  });
  console.log(
    "Admin created — email: admin@greenview.com | password: admin1234",
  );

  // ── 3. STUDENTS ───────────────────────────────────────────────────────────
  const studentData = [
    {
      name: "Aryan Kapoor",
      cms_id: 221001,
      room_no: 101,
      batch: 2022,
      dept: "SEECS",
      course: "CS",
      email: "aryan@greenview.com",
      father_name: "Ravi Kapoor",
      contact: "03111111101",
      address: "Lahore",
      dob: "2003-03-12",
      cnic: "3520211111011",
    },
    {
      name: "Rohan Mehta",
      cms_id: 221002,
      room_no: 102,
      batch: 2022,
      dept: "SEECS",
      course: "CS",
      email: "rohan@greenview.com",
      father_name: "Sunil Mehta",
      contact: "03111111102",
      address: "Karachi",
      dob: "2003-05-20",
      cnic: "3520211111022",
    },
    {
      name: "Kiran Patel",
      cms_id: 221003,
      room_no: 103,
      batch: 2022,
      dept: "SADA",
      course: "EE",
      email: "kiran@greenview.com",
      father_name: "Dinesh Patel",
      contact: "03111111103",
      address: "Multan",
      dob: "2003-07-08",
      cnic: "3520211111033",
    },
    {
      name: "Dev Nair",
      cms_id: 221004,
      room_no: 104,
      batch: 2022,
      dept: "SADA",
      course: "EE",
      email: "dev@greenview.com",
      father_name: "Anil Nair",
      contact: "03111111104",
      address: "Peshawar",
      dob: "2003-09-14",
      cnic: "3520211111044",
    },
    {
      name: "Sana Rao",
      cms_id: 221005,
      room_no: 105,
      batch: 2022,
      dept: "SNS",
      course: "Math",
      email: "sana@greenview.com",
      father_name: "Ramu Rao",
      contact: "03111111105",
      address: "Faisalabad",
      dob: "2003-11-25",
      cnic: "3520211111055",
    },
    {
      name: "Usman Sheikh",
      cms_id: 221006,
      room_no: 106,
      batch: 2022,
      dept: "SEECS",
      course: "CS",
      email: "usman@greenview.com",
      father_name: "Tariq Sheikh",
      contact: "03111111106",
      address: "Rawalpindi",
      dob: "2003-01-30",
      cnic: "3520211111066",
    },
    {
      name: "Priya Singh",
      cms_id: 221007,
      room_no: 107,
      batch: 2022,
      dept: "SMME",
      course: "ME",
      email: "priya@greenview.com",
      father_name: "Gurpreet Singh",
      contact: "03111111107",
      address: "Sialkot",
      dob: "2004-02-18",
      cnic: "3520211111077",
    },
    {
      name: "Hamza Malik",
      cms_id: 221008,
      room_no: 108,
      batch: 2022,
      dept: "SMME",
      course: "ME",
      email: "hamza@greenview.com",
      father_name: "Bilal Malik",
      contact: "03111111108",
      address: "Gujranwala",
      dob: "2004-04-22",
      cnic: "3520211111088",
    },
    {
      name: "Fatima Zahra",
      cms_id: 221009,
      room_no: 109,
      batch: 2022,
      dept: "SNS",
      course: "Phy",
      email: "fatima@greenview.com",
      father_name: "Ahmed Zahra",
      contact: "03111111109",
      address: "Quetta",
      dob: "2004-06-05",
      cnic: "3520211111099",
    },
    {
      name: "Zain Abbas",
      cms_id: 221010,
      room_no: 110,
      batch: 2022,
      dept: "SEECS",
      course: "CS",
      email: "zain@greenview.com",
      father_name: "Ali Abbas",
      contact: "03111111110",
      address: "Hyderabad",
      dob: "2004-08-17",
      cnic: "3520211111100",
    },
  ];

  const hashedPw = await bcrypt.hash("student1234", salt);
  const students = [];
  for (const s of studentData) {
    const u = await User.create({
      email: s.email,
      password: hashedPw,
      isAdmin: false,
    });
    const st = await Student.create({
      ...s,
      dob: new Date(s.dob),
      user: u._id,
      hostel: hostel._id,
    });
    students.push(st);
  }
  console.log(
    `${students.length} students created — password for all: student1234`,
  );

  // ── 4. ATTENDANCE (last 30 days for each student) ─────────────────────────
  const attendanceDocs = [];
  for (const student of students) {
    for (let i = 29; i >= 0; i--) {
      // ~80% present rate
      const status = Math.random() < 0.8 ? "present" : "absent";
      attendanceDocs.push({ student: student._id, date: daysAgo(i), status });
    }
  }
  await Attendance.insertMany(attendanceDocs);
  console.log(`${attendanceDocs.length} attendance records created`);

  // ── 5. COMPLAINTS ─────────────────────────────────────────────────────────
  const complaintData = [
    {
      student: students[0],
      type: "Maintenance",
      title: "Broken fan in room 101",
      description:
        "The ceiling fan in my room has stopped working. It is very hot at night and I cannot sleep properly. Please get it fixed as soon as possible.",
      status: "pending",
      date: daysAgo(12),
    },
    {
      student: students[1],
      type: "Food",
      title: "Poor quality dinner on weekends",
      description:
        "The dinner served on Saturday and Sunday is of very low quality compared to weekdays. The dal is watery and the roti is hard. This needs to be improved.",
      status: "resolved",
      date: daysAgo(20),
    },
    {
      student: students[2],
      type: "Cleanliness",
      title: "Washroom not cleaned regularly",
      description:
        "The washroom on floor 1 is not being cleaned daily. There is a bad smell and the floor is always wet. The cleaning schedule should be twice a day.",
      status: "pending",
      date: daysAgo(5),
    },
    {
      student: students[3],
      type: "Electricity",
      title: "Power outage in Block B for 3 hours",
      description:
        "Last Tuesday there was a power cut from 8pm to 11pm with no generator backup. I missed an important online exam because of this. This should not happen again.",
      status: "resolved",
      date: daysAgo(15),
    },
    {
      student: students[4],
      type: "Maintenance",
      title: "Leaking tap in room 105",
      description:
        "The tap in the washroom attached to room 105 has been leaking for the past week. It wastes a lot of water and makes noise at night. Please send someone to fix it.",
      status: "pending",
      date: daysAgo(3),
    },
    {
      student: students[5],
      type: "Internet",
      title: "WiFi very slow after 9pm",
      description:
        "Every evening after 9pm the WiFi speed drops drastically. It is impossible to stream lectures or submit assignments. This problem has been ongoing for 2 weeks now.",
      status: "pending",
      date: daysAgo(8),
    },
    {
      student: students[6],
      type: "Security",
      title: "Main gate left open at night",
      description:
        "On multiple occasions the main entrance gate was left open after 11pm. This is a serious security concern and strict action should be taken against the guard on duty.",
      status: "resolved",
      date: daysAgo(25),
    },
    {
      student: students[7],
      type: "Food",
      title: "Mess closed early on Thursday",
      description:
        "The mess was closed at 7pm last Thursday without any prior notice. Many students who came for dinner had to go hungry. A proper notice should always be given in advance.",
      status: "pending",
      date: daysAgo(6),
    },
    {
      student: students[8],
      type: "Cleanliness",
      title: "Garbage not collected from corridor",
      description:
        "The garbage bins on the second floor corridor have not been emptied for 3 days. The smell is unbearable and it is a health hazard. Please arrange immediate collection.",
      status: "pending",
      date: daysAgo(2),
    },
    {
      student: students[9],
      type: "Maintenance",
      title: "Hot water not available in mornings",
      description:
        "For the past two weeks hot water has not been available before 8am. Most students need to shower early before their 8am classes. Please fix the geyser timing.",
      status: "pending",
      date: daysAgo(10),
    },
  ];
  await Complaint.insertMany(
    complaintData.map((c) => ({
      student: c.student._id,
      hostel: hostel._id,
      type: c.type,
      title: c.title,
      description: c.description,
      status: c.status,
      date: c.date,
    })),
  );
  console.log(`${complaintData.length} complaints created`);

  // ── 6. SUGGESTIONS ────────────────────────────────────────────────────────
  const suggestionData = [
    {
      student: students[0],
      title: "Add a study room with proper lighting",
      description:
        "A dedicated quiet study room with proper lighting and charging points would greatly help students who need to study late at night without disturbing their roommates.",
      status: "pending",
      date: daysAgo(18),
    },
    {
      student: students[1],
      title: "Install water cooler on each floor",
      description:
        "Currently there is only one water cooler for the entire hostel near the ground floor. Installing one on each floor would save a lot of time and encourage students to stay hydrated.",
      status: "resolved",
      date: daysAgo(30),
    },
    {
      student: students[2],
      title: "Weekend mess menu variety",
      description:
        "The weekend mess menu is very repetitive. I suggest the admin introduce at least one special dish every Saturday to give students something to look forward to.",
      status: "pending",
      date: daysAgo(7),
    },
    {
      student: students[3],
      title: "Common room TV subscription",
      description:
        "The common room TV does not have a cable or streaming subscription. Adding a basic cable connection would give students a way to relax and stay updated with news.",
      status: "pending",
      date: daysAgo(14),
    },
    {
      student: students[4],
      title: "Introduce a complaint tracking display",
      description:
        "A notice board or digital display showing the status of submitted complaints would keep students informed and show that the administration is taking action.",
      status: "resolved",
      date: daysAgo(22),
    },
    {
      student: students[5],
      title: "Extend mess timings by 30 minutes",
      description:
        "Many students have evening lab sessions that run until 7:30pm. By the time they reach the mess it is already closing. Extending dinner timing by 30 minutes would help a lot.",
      status: "pending",
      date: daysAgo(4),
    },
    {
      student: students[6],
      title: "Set up a laundry schedule system",
      description:
        "The washing machines are always occupied with no way to know when they will be free. A simple signup sheet or digital slot booking system would make laundry much easier to manage.",
      status: "pending",
      date: daysAgo(9),
    },
  ];
  await Suggestion.insertMany(
    suggestionData.map((s) => ({
      student: s.student._id,
      hostel: hostel._id,
      title: s.title,
      description: s.description,
      status: s.status,
      date: s.date,
    })),
  );
  console.log(`${suggestionData.length} suggestions created`);

  // ── 7. INVOICES ───────────────────────────────────────────────────────────
  const invoiceData = [];
  const months = ["January 2025", "February 2025", "March 2025", "April 2025"];
  const amounts = [4500, 4500, 4800, 4800];
  for (const student of students) {
    months.forEach((month, i) => {
      // First 2 months paid, last 2 pending
      invoiceData.push({
        student: student._id,
        title: `Mess Fee — ${month}`,
        amount: amounts[i],
        status: i < 2 ? "paid" : "pending",
        date: daysAgo(90 - i * 30),
      });
    });
  }
  await Invoice.insertMany(invoiceData);
  console.log(`${invoiceData.length} invoices created`);

  // ── 8. MESS-OFF REQUESTS ──────────────────────────────────────────────────
  const messOffData = [
    {
      student: students[0],
      leaving_date: daysAgo(20),
      return_date: daysAgo(15),
      status: "approved",
      request_date: daysAgo(22),
    },
    {
      student: students[1],
      leaving_date: daysAgo(10),
      return_date: daysAgo(6),
      status: "approved",
      request_date: daysAgo(12),
    },
    {
      student: students[2],
      leaving_date: daysAgo(5),
      return_date: daysAgo(2),
      status: "rejected",
      request_date: daysAgo(6),
    },
    {
      student: students[3],
      leaving_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      return_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "pending",
      request_date: daysAgo(1),
    },
    {
      student: students[4],
      leaving_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      return_date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      status: "pending",
      request_date: daysAgo(0),
    },
    {
      student: students[5],
      leaving_date: daysAgo(30),
      return_date: daysAgo(25),
      status: "approved",
      request_date: daysAgo(32),
    },
    {
      student: students[6],
      leaving_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      return_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      status: "pending",
      request_date: daysAgo(0),
    },
  ];
  await MessOff.insertMany(
    messOffData.map((m) => ({
      student: m.student._id,
      leaving_date: m.leaving_date,
      return_date: m.return_date,
      status: m.status,
      request_date: m.request_date,
    })),
  );
  console.log(`${messOffData.length} mess-off requests created`);

  // ── SUMMARY ───────────────────────────────────────────────────────────────
  console.log("\n========================================");
  console.log("   DATABASE SEEDED SUCCESSFULLY!");
  console.log("========================================");
  console.log("\n  ADMIN LOGIN");
  console.log("  Email   : admin@greenview.com");
  console.log("  Password: admin1234");
  console.log("\n  STUDENT LOGINS (all same password)");
  students.forEach((s) => console.log(`  ${s.email.padEnd(28)} | student1234`));
  console.log("\n  WHAT WAS CREATED:");
  console.log(`  - 1 Hostel (Greenview Hostel)`);
  console.log(`  - 1 Admin`);
  console.log(`  - ${students.length} Students`);
  console.log(`  - ${attendanceDocs.length} Attendance records (30 days each)`);
  console.log(
    `  - ${complaintData.length} Complaints (mix of pending/resolved)`,
  );
  console.log(
    `  - ${suggestionData.length} Suggestions (mix of pending/resolved)`,
  );
  console.log(
    `  - ${invoiceData.length} Invoices (2 paid, 2 pending per student)`,
  );
  console.log(
    `  - ${messOffData.length} Mess-off requests (mix of all statuses)`,
  );
  console.log("========================================\n");

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});

import PropTypes from "prop-types";

ShortCard.propTypes = { title: PropTypes.string.isRequired, number: PropTypes.number.isRequired, icon: PropTypes.string, color: PropTypes.string };

function ShortCard({ number, title, icon = "📊", color = "green" }) {
  const colors = {
    green: { bg: "bg-green-50", border: "border-green-200", num: "text-green-600", icon: "bg-green-100 text-green-600", title: "text-green-800" },
    blue:  { bg: "bg-blue-50",  border: "border-blue-200",  num: "text-blue-600",  icon: "bg-blue-100 text-blue-600",   title: "text-blue-800"  },
    amber: { bg: "bg-amber-50", border: "border-amber-200", num: "text-amber-600", icon: "bg-amber-100 text-amber-600", title: "text-amber-800" },
    rose:  { bg: "bg-rose-50",  border: "border-rose-200",  num: "text-rose-600",  icon: "bg-rose-100 text-rose-600",   title: "text-rose-800"  },
  };
  const c = colors[color] || colors.green;
  return (
    <div className={`flex-1 min-w-[180px] ${c.bg} border ${c.border} rounded-2xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow`}>
      <div className={`w-10 h-10 rounded-xl ${c.icon} flex items-center justify-center text-lg`}>{icon}</div>
      <div>
        <div className={`text-3xl font-bold ${c.num}`}>{number}</div>
        <div className={`text-sm font-medium mt-0.5 ${c.title}`}>{title}</div>
      </div>
    </div>
  );
}

export { ShortCard };

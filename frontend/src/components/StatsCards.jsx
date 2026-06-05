
import { FaShieldAlt, FaBug, FaBan } from "react-icons/fa";

function StatsCards({ threats }) {
  const totalThreats = threats.length;

  const blockedThreats = threats.filter(
    (threat) => threat.threatScore >= 50
  ).length;

  const highSeverity = threats.filter(
    (threat) => threat.threatScore >= 100
  ).length;

  const cards = [
    {
      title: "Total Threats",
      value: totalThreats,
      icon: <FaBug size={28} />,
      color: "text-red-500",
    },
    {
      title: "Blocked Threats",
      value: blockedThreats,
      icon: <FaBan size={28} />,
      color: "text-orange-500",
    },
    {
      title: "High Severity",
      value: highSeverity,
      icon: <FaShieldAlt size={28} />,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-sm">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {card.value}
              </h2>
            </div>

            <div className={card.color}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
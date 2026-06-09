import {
  FaBug,
  FaShieldAlt,
  FaBan,
} from "react-icons/fa";

function StatsCards({ threats }) {

  const totalThreats =
    threats.length;

  const blockedThreats =
    threats.filter(
      (threat) => threat.threatScore >= 50
    ).length;

  const highSeverity =
    threats.filter(
      (threat) => threat.threatScore >= 100
    ).length;

  const stats = [
    {
      title: "Total Threats",
      value: totalThreats,
      icon: <FaBug />,
      color: "text-red-500",
    },

    {
      title: "Blocked Threats",
      value: blockedThreats,
      icon: <FaBan />,
      color: "text-orange-400",
    },

    {
      title: "High Severity",
      value: highSeverity,
      icon: <FaShieldAlt />,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6  md:grid-cols-3">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="
            bg-zinc-900/60
            border
            border-zinc-800
            rounded-3xl
            p-6
            backdrop-blur-xl
            hover:scale-[1.02]
            transition-all
            duration-300
            shadow-lg
          "
        >
          <div className="flex items-center justify-between ">
            <div>
              <p className="mb-2 text-zinc-400">
                {stat.title}
              </p>

              <h2 className="text-5xl font-black ">
                {stat.value}
              </h2>
            </div>

            <div className={`
              text-4xl
              ${stat.color}
            `}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
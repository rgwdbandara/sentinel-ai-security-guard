function BlockedIPsTable({ threats }) {
  const blockedThreats = threats.filter(
    (threat) => threat.threatScore >= 50
  );

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold text-red-500 mb-6">
        🚫 Blocked IP Addresses
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-700 text-left">
              <th className="pb-3">IP Address</th>
              <th className="pb-3">Threat Type</th>
              <th className="pb-3">Threat Score</th>
              <th className="pb-3">Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {blockedThreats.map((threat, index) => (
              <tr
                key={index}
                className="border-b border-zinc-800"
              >
                <td className="py-4">{threat.ip}</td>

                <td className="py-4 text-red-400">
                  {threat.detectedThreats.join(", ")}
                </td>

                <td className="py-4">
                  {threat.threatScore}
                </td>

                <td className="py-4 text-zinc-400">
                  {new Date(
                    threat.timestamp
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BlockedIPsTable;

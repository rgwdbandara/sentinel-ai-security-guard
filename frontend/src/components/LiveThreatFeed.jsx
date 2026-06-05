
import { useEffect } from "react";
import socket from "../services/socket";

function LiveThreatFeed({ threats, setThreats }) {

  useEffect(() => {
    socket.on("security-threat", (data) => {
      setThreats((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("security-threat");
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
      <h2 className="text-2xl font-bold text-red-500 mb-4">
        🚨 Live Threat Feed
      </h2>

      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {threats.length === 0 && (
          <p className="text-zinc-400">
            No threats detected yet.
          </p>
        )}

        {threats.map((threat, index) => (
          <div
            key={index}
            className="bg-black border border-red-500 rounded-lg p-4"
          >
            <p>
              <span className="font-bold text-red-400">
                Threat:
              </span>{" "}
              {threat.detectedThreats.join(", ")}
            </p>

            <p>
              <span className="font-bold text-red-400">
                Threat Score:
              </span>{" "}
              {threat.threatScore}
            </p>

            <p>
              <span className="font-bold text-red-400">
                IP:
              </span>{" "}
              {threat.ip}
            </p>

            <p className="text-zinc-400 text-sm mt-2">
              {new Date(threat.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveThreatFeed;

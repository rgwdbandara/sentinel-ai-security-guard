import { useEffect } from "react";
import { motion } from "framer-motion";

import socket from "../services/socket";

function LiveThreatFeed({
  threats,
  setThreats,
}) {

  useEffect(() => {

    socket.on(
      "security-threat",
      (data) => {

        setThreats((prev) => [
          data,
          ...prev,
        ]);
      }
    );

    return () => {
      socket.off("security-threat");
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSeverityColor = (
    severity
  ) => {

    switch (severity) {

      case "CRITICAL":
        return `
          bg-red-500/20
          text-red-400
          border-red-500/40
        `;

      case "HIGH":
        return `
          bg-orange-500/20
          text-orange-400
          border-orange-500/40
        `;

      case "MEDIUM":
        return `
          bg-yellow-500/20
          text-yellow-400
          border-yellow-500/40
        `;

      default:
        return `
          bg-blue-500/20
          text-blue-400
          border-blue-500/40
        `;
    }
  };

  return (
    <div
      className="p-6 border shadow-lg  bg-zinc-900/60 border-zinc-800 rounded-3xl backdrop-blur-xl"
    >

      <div className="flex items-center justify-between mb-6 ">

        <h2 className="text-3xl font-black text-red-500 ">
          🚨 Live Threat Feed
        </h2>

        <div className="flex items-center gap-2 ">
          <div className="w-2 h-2 bg-green-500 rounded-full  animate-pulse" />

          <span className="text-sm font-semibold text-green-400 ">
            LIVE
          </span>
        </div>

      </div>

      <div className="
        space-y-5
        max-h-[650px]
        overflow-y-auto
        pr-2
      ">

        {threats.length === 0 && (

          <div className="
            flex
            items-center
            justify-center
            h-[200px]
            border
            border-dashed
            border-zinc-700
            rounded-2xl
          ">
            <p className="text-lg  text-zinc-500">
              No threats detected yet.
            </p>
          </div>

        )}

        {threats.map(
          (threat, index) => (

          <motion.div
            key={index}

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.4,
            }}

            className="
              bg-black/60
              border
              border-red-500/30
              rounded-3xl
              p-5
              backdrop-blur-xl
              shadow-lg
              shadow-red-500/10
              hover:scale-[1.01]
              transition-all
              duration-300
            "
          >

            <div className="mb-4">

              <span
                className={`
                  inline-block
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-bold
                  border
                  ${getSeverityColor(
                    threat.severity
                  )}
                `}
              >
                {threat.severity || "LOW"}
              </span>

            </div>

            <div className="grid grid-cols-1 gap-3 ">

              <p className="text-lg">

                <span className="font-bold text-red-400 ">
                  Threat:
                </span>{" "}

                <span className="font-semibold text-white ">
                  {
                    threat.detectedThreats.join(
                      ", "
                    )
                  }
                </span>

              </p>

              <p>

                <span className="font-bold text-red-400 ">
                  Threat Score:
                </span>{" "}

                <span className="font-semibold text-white ">
                  {threat.threatScore}
                </span>

              </p>

              <p>

                <span className="font-bold  text-cyan-400">
                  AI Threat Type:
                </span>{" "}

                <span className="font-semibold  text-cyan-300">
                  {
                    threat.aiThreatType
                    || "UNKNOWN"
                  }
                </span>

              </p>

              <p>

                <span className="font-bold  text-cyan-400">
                  AI Confidence:
                </span>{" "}

                <span className="font-semibold  text-cyan-300">
                  {
                    threat.aiConfidenceScore
                      ? `${Math.round(
                          threat.aiConfidenceScore
                          * 100
                        )}%`
                      : "N/A"
                  }
                </span>

              </p>

              <p>

                <span className="font-bold text-red-400 ">
                  IP:
                </span>{" "}

                <span className=" text-zinc-300">
                  {threat.ip}
                </span>

              </p>

              <div className="p-4 mt-2 border  rounded-2xl bg-zinc-900/80 border-zinc-800">

                <p className="text-sm leading-relaxed  text-zinc-300">
                  {
                    threat.aiExplanation
                    || "No AI explanation available."
                  }
                </p>

              </div>

              <p className="mt-2 text-sm  text-zinc-500">
                {
                  new Date(
                    threat.timestamp
                  ).toLocaleString()
                }
              </p>

            </div>

          </motion.div>

        ))}
      </div>
    </div>
  );
}

export default LiveThreatFeed;
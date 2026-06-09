import { useEffect, useState } from "react";

import LiveThreatFeed from "./components/LiveThreatFeed";
import StatsCards from "./components/StatsCards";
import ThreatChart from "./charts/ThreatChart";
import API from "./services/api";
import BlockedIPsTable from "./components/BlockedIPsTable";

function App() {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    const fetchAttackHistory = async () => {
      try {
        const response =
          await API.get("/analytics/attacks");

        const historicalThreats =
          response.data.data.map((log) => ({
            ip: log.ip || "UNKNOWN",

            detectedThreats:
              log.detectedThreats || [],

            threatScore:
              log.threatScore || 0,

            timestamp:
              log.createdAt || new Date(),

            aiThreatType:
              log.aiThreatType || "UNKNOWN",

            aiConfidenceScore:
              log.aiConfidenceScore || 0,

            aiExplanation:
              log.aiExplanation ||
              "No AI explanation available.",
          }));

        setThreats(historicalThreats);
      } catch (error) {
        console.log(
          "Fetch Attack History Error:",
          error.message
        );
      }
    };

    fetchAttackHistory();
  }, []);

  return (
    <div className="min-h-screen p-8 text-white cyber-grid">

      <div className="mx-auto max-w-7xl">

        <div className="flex items-center justify-between mb-12">

          <div>
            <h1 className="text-6xl font-black tracking-tight text-red-500">
              Sentinel AI
            </h1>

            <p className="mt-3 text-lg text-zinc-400">
              Enterprise Threat Monitoring Platform
            </p>
          </div>

          <div className="flex items-center gap-3 px-5 py-3 border  bg-zinc-900/70 border-zinc-800 rounded-2xl backdrop-blur-xl">
            <div className="w-3 h-3 bg-green-500 rounded-full  animate-pulse" />

            <span className="font-semibold text-green-400">
              LIVE MONITORING
            </span>
          </div>
        </div>

        <StatsCards threats={threats} />

        <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">

          <LiveThreatFeed
            threats={threats}
            setThreats={setThreats}
          />

          <ThreatChart threats={threats} />

        </div>

        <div className="mt-10">
          <BlockedIPsTable threats={threats} />
        </div>

      </div>
    </div>
  );
}

export default App;
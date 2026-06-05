
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
        const response = await API.get("/analytics/attacks");

const historicalThreats = response.data.data.map((log) => ({
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
    log.aiExplanation || "No AI explanation available.",
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
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-red-500 mb-2">
          Sentinel AI Security Dashboard
        </h1>

        <p className="text-zinc-400 mb-10">
          Real-time API Threat Monitoring System
        </p>

        <StatsCards threats={threats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LiveThreatFeed
            threats={threats}
            setThreats={setThreats}
          />

          <ThreatChart threats={threats} />
        </div>

        <BlockedIPsTable threats={threats} />
      </div>
    </div>
  );
}

export default App;


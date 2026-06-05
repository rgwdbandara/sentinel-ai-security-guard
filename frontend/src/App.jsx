
import { useState } from "react";

import LiveThreatFeed from "./components/LiveThreatFeed";
import StatsCards from "./components/StatsCards";
import ThreatChart from "./charts/ThreatChart";

function App() {
  const [threats, setThreats] = useState([]);

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
      </div>
    </div>
  );
}

export default App;

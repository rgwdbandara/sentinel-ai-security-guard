
import LiveThreatFeed from "./components/LiveThreatFeed";

function App() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-red-500 mb-2">
          Sentinel AI Security Dashboard
        </h1>

        <p className="text-zinc-400 mb-10">
          Real-time API Threat Monitoring System
        </p>

        <LiveThreatFeed />
      </div>
    </div>
  );
}

export default App;

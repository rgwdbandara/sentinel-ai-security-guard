import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import rateLimiter from "./middleware/rateLimiter.js";
import threatDetection from "./middleware/threatDetection.js";
import blockMiddleware from "./middleware/blockMiddleware.js";
import connectDB from "./config/database.js";
import http from "http";
import { initializeSocketServer } from "./sockets/socketServer.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

dotenv.config();


const app = express();
connectDB();

app.set("trust proxy", 1);

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());


app.use(rateLimiter);
app.use(blockMiddleware);
app.use(threatDetection);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Sentinel AI Security Guard API Running",
    threatAnalysis: req.threatAnalysis,
  });
});

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initializeSocketServer(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";

import {
  getAttackLogs,
  getBlockedIPs,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/attacks", getAttackLogs);

router.get("/blocked-ips", getBlockedIPs);

export default router;


import AttackLog from "../models/AttackLog.js";

export const getAttackLogs = async (req, res) => {
  try {
    const logs = await AttackLog.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    console.log("Get Attack Logs Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch attack logs",
    });
  }
};

export const getBlockedIPs = async (req, res) => {
  try {
    const blockedLogs = await AttackLog.find({
      blocked: true,
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      data: blockedLogs,
    });
  } catch (error) {
    console.log("Get Blocked IPs Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch blocked IPs",
    });
  }
};


import mongoose from "mongoose";

const attackLogSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },

    detectedThreats: {
      type: [String],
      default: [],
    },

    threatScore: {
      type: Number,
      default: 0,
    },

    requestPath: {
      type: String,
    },

    requestMethod: {
      type: String,
    },

    payload: {
      type: Object,
      default: {},
    },

    headers: {
      type: Object,
      default: {},
    },

    blocked: {
      type: Boolean,
      default: false,
    },

    severity: {
  type: String,
  default: "LOW",
},
  },
  {
    timestamps: true,
  }
);

const AttackLog = mongoose.model("AttackLog", attackLogSchema);

export default AttackLog;

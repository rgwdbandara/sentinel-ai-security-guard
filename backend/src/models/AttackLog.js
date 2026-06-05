
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

    
aiThreatType: {
  type: String,
  default: "NONE",
},

aiConfidenceScore: {
  type: Number,
  default: 0,
},

aiExplanation: {
  type: String,
  default: "",
},


  },
  {
    timestamps: true,
  }
);

const AttackLog = mongoose.model("AttackLog", attackLogSchema);

export default AttackLog;

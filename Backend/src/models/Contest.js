import mongoose from "mongoose";

const contestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    startTime: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    questions: {
    type: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        },
    ],
    validate: {
        validator: (value) => value.length > 0,
        message: "Contest must contain at least one question.",
    },
    },    
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Upcoming",
        "Live",
        "Completed",
      ],
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);

const Contest = mongoose.model(
  "Contest",
  contestSchema
);

export default Contest;
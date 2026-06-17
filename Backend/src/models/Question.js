import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      required: true,
    },

    correctAnswer: {
      type: String,
      required: true
    },

    subject: {
      type: String,
      required: true,

      enum: [
        "DSA",
        "DBMS",
        "OS",
        "CN",
        "OOP",
      ],
    },

    difficulty: {
      type: String,

      required: true,

      enum: [
        "Easy",
        "Medium",
        "Hard",
      ],
    },

    explanation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
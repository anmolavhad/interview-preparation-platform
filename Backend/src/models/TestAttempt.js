import mongoose from "mongoose";

const testAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    testType: {
      type: String,
      enum: ["subject", "mock"],
      required: true,
    },

    subject: {
      type: String,
      default: null,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    correctAnswers: {
      type: Number,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    accuracy: {
      type: Number,
      required: true,
    },

    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
        question: String,
        selectedAnswer: String,

        correctAnswer: String,
        explanation: String,
        isCorrect: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const TestAttempt = mongoose.model(
  "TestAttempt",
  testAttemptSchema
);

export default TestAttempt;
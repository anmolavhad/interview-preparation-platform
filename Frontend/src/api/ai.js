import api from "./axios";

export const askAI = async (message) => {
  const response = await api.post("/ai/chat", {
    message,
  });

  return response.data.reply;
};
import { createContext, useState } from "react";

export const ChatContext = createContext();

const firstPrompt = {
  role: "user",
  parts: [
    {
      text: `You are a virtual assistant Gary in the online second hand camera store Camera Store. Your aim is to answer customers questions about different cameras. You are to recommend cameras based on suitability, and inform customers which cameras are currently available. You are to use relatively short replies with friendly and informal language. Only recommend customers cameras that are in stock.  Here is the json data from the database of all of the cameras currently available cameras:)}`,
    },
  ],
};

const secondPrompt = {
  role: "model",
  parts: [
    {
      text: "Hello. I'm Gary, your virtual assistant at the 'Camera Store'! What can I help you with today? 😊\n",
    },
  ],
};

export const ChatContextProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([firstPrompt, secondPrompt]);

  function updateHistory(value, data) {
    setChatHistory((oldChatHistory) => [
      ...oldChatHistory,
      {
        role: "user",
        parts: [{ text: value }],
      },
      {
        role: "model",
        parts: [{ text: data }],
      },
    ]);
  }

  return (
    <ChatContext.Provider value={{ chatHistory, updateHistory }}>
      {children}
    </ChatContext.Provider>
  );
};

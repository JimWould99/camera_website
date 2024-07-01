import { createContext } from "react";

let chatHistory = "";

export const ChatContext = createContext(chatHistory);

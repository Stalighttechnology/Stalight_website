export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

export interface ChatbotProps {
  apiBaseUrl?: string;
  defaultOpen?: boolean;
}

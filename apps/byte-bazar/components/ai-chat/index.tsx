"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  Input,
} from "../../../../packages/ui/src/components";

interface AIChatProps {}

export const customScrollbar = [
  // Basic sizing - thin but not too thin
  "[&::-webkit-scrollbar]:w-1.5",
  "[&::-webkit-scrollbar]:h-1.5",

  // The draggable thumb
  "[&::-webkit-scrollbar-thumb]:bg-gray-300",
  "[&::-webkit-scrollbar-thumb]:rounded-md",

  // Smooth interactions feel professional
  "[&::-webkit-scrollbar-thumb]:transition-colors",
  "[&::-webkit-scrollbar-thumb]:duration-200",
  "[&::-webkit-scrollbar-thumb:hover]:bg-gray-400",

  // Clean track and hidden buttons
  "[&::-webkit-scrollbar-track]:bg-transparent",
  "[&::-webkit-scrollbar-button]:hidden",
].join(" ");

const AIChat = ({}: AIChatProps) => {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();
  return (
    <Card className="fixed right-5 bottom-20 z-200 overflow-y-auto max-h-[80vh] flex flex-col w-full max-w-md py-8 mx-auto stretch">
      <CardContent className="">
        <div className={`${customScrollbar} rounded-md max-h-60 overflow-auto`}>
          {messages.map((message) => (
            <div
              key={message.id}
              className="bg-muted rounded-lg whitespace-pre-wrap"
            >
              {message.role === "user" ? "User:" : "AI:"}
              {message.parts.map((part, idx) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div className="m-2 p-1" key={`${message.id}-${idx}`}>
                        {part.text}
                      </div>
                    );
                  case "tool-weather":
                  case "tool-convertFahrenheitToCelsius":
                    return (
                      <pre key={`${message.id}-${idx}`}>
                        {JSON.stringify(part, null, 2)}
                      </pre>
                    );
                }
              })}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage({ text: input });
            setInput("");
          }}
          className="w-full"
        >
          <Input
            value={input}
            placeholder="Say something..."
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </form>
      </CardFooter>
    </Card>
  );
};

export default AIChat;

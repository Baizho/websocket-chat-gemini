"use client";
import useWebSocket from "@/lib/hooks/useWebsocket";
import { JSX, SVGProps, useEffect, useRef, useState } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";

export default function Home() {
  const { messages, sendMessage } = useWebSocket();
  const [prompt, setPrompt] = useState("");

  const handleSend = () => {
    if (prompt.trim() !== "") {
      sendMessage(prompt);
      setPrompt("");
    }
  };

  useEffect(() => {
    // console.log("changed", messages);
  }, [messages]);


  const messageEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messageEl !== null && messageEl.current !== null) {
      messageEl.current.addEventListener(
        "DOMNodeInserted",
        (event: { currentTarget: any }) => {
          const { currentTarget: target } = event;
          target.scroll({ top: target.scrollHeight, behavior: "smooth" });
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col h-[90vh] max-w-2xl mx-auto bg-background rounded-2xl shadow-lg overflow-hidden font-sans">
      <header className="bg-primary text-primary-foreground px-6 py-4 flex items-center gap-4">
        <Avatar className="w-8 h-8 border-2 border-primary-foreground">
          {/* <AvatarImage src="/placeholder-user.jpg" /> */}
          <AvatarFallback>CB</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-medium">Chatbot</h2>
      </header>
      <div className="flex-1 overflow-auto p-6 space-y-4" ref={messageEl}>
        {messages.map((message, index) => {
          if (message.role === "chat") {
            return (
              <div key={index} className="flex items-start gap-4">
                <Avatar className="w-8 h-8 border-2 border-muted">
                  {/* <AvatarImage src="/placeholder-user.jpg" /> */}
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl p-4 max-w-[70%]">
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="flex items-start gap-4 justify-end">
                <div className="bg-primary rounded-2xl p-4 max-w-[70%] text-primary-foreground">
                  <p className="text-sm">{message.content}</p>
                </div>
                <Avatar className="w-8 h-8 border-2 border-primary">
                  {/* <AvatarImage src="/placeholder-user.jpg" /> */}
                  <AvatarFallback>CB</AvatarFallback>
                </Avatar>
              </div>
            );
          }
        })}
      </div>
      <div className="bg-muted px-6 py-4 flex items-center gap-4">
        <Textarea
          placeholder="Type your message..."
          value={prompt}
          onChange={(e) => {
            // console.log("writing");
            setPrompt(e.currentTarget.value);
          }}
          className="flex-1 resize-none rounded-2xl border-none focus:ring-0 focus:outline-none"
          rows={1}
        />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={handleSend}
        >
          <SendIcon className="w-5 h-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
}

function SendIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

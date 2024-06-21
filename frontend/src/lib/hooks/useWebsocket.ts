import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';


interface Message {
  content: string;
  role:  "user" | "chat";
}

const useWebSocket = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<any>();
  useEffect(() => {
    const socket = io("ws://websocket-chat-gemini-backend.vercel.app/", {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("connected");
    });  
    socket.emit("sendHistory", "send it bruh");
    socket.on("loadHistory", (res) => {
      console.log(res);
      setMessages(res);
    })
    socketRef.current = socket;
  }, [])

  useEffect(() => {
    socketRef.current.on("chat-response", (res: any) => { 
      // console.log("the message" ,messages);
      const copy = [...messages];
      copy.pop();
      copy.push({content: res, role: "chat"});
      setMessages(copy);
    })
  }, [messages]);
  const sendMessage = (message : string) => {
    // console.log("sending message");
    setMessages((prevMessages) => [...prevMessages, {content: message, role:"user"}, {content: "typing...", role:"chat"}]);
    socketRef.current.emit("sendMessage", message);
  }
  return {messages, sendMessage};
};

export default useWebSocket;

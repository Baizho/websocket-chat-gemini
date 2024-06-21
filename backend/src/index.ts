import 'dotenv/config';
import express from 'express';
import globalRouter from './global-router';
import { logger } from './logger';
import { Server } from 'socket.io';
import genModel from './gemini';
import http from 'http';
import connectDB from './db';

const app = express();
const PORT = process.env.PORT || 5000;
const url = process.env.url;

connectDB();

app.use(logger);
app.use(express.json());
app.use('/api/v1/', globalRouter);

const server = http.createServer(app);
const io = new Server(server);

// Handle WebSocket connections with origin validation
io.on("connect", (socket) => {
  console.log("a user connected");
  socket.on("sendMessage", async (res) => {
    console.log(res, "message came");
    const result = await genModel.generateContentStream(
      res
    );
    let text = '';
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      text += chunkText;

      socket.emit("chat-response", text);
    }
  })
});

app.get("/", () => {
  console.log("main page");
})

server.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});

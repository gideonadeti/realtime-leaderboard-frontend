import { io } from "socket.io-client";

const socketInstance = io(
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/v1",
  {
    transports: ["websocket"],
  }
);

export default socketInstance;

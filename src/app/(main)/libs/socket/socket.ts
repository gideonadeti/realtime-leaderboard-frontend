import { io } from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  {
    withCredentials: true,
    transports: ["websocket"],
  }
);

export default socket;

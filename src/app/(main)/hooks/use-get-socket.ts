import { useAuth } from "@clerk/nextjs";
import { useMemo } from "react";
import { io } from "socket.io-client";

const useGetSocket = () => {
  const { getToken } = useAuth();

  return useMemo(() => {
    return async () => {
      const token = await getToken();

      return io(
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
        {
          transports: ["websocket"],
          auth: {
            token,
          },
        }
      );
    };
  }, [getToken]);
};

export default useGetSocket;

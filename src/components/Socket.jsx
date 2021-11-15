import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
export default function Socket() {
  const [conn, setConn] = useState(false);
  useEffect(() => {
    const socket = io("http://localhost:5000/");
    document.socket = socket;
    socket.on("connect", () => {
      //   console.log("socket connected");
      setConn(true);
    });
    socket.on("done", (data) => {
      //   console.log(data);
      //   socket.emit("mousemove", { x: data.x + 2, y: data.y + 2 });
    });
  }, []);
  return <div className="Socket">{conn && "Connected"}</div>;
}

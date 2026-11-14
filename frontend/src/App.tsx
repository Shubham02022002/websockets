import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Socket opened");
      setSocket(socket);
    };
    socket.onmessage = (message) => {
      console.log("Message: ", message.data);
      setMessages((m) => [...m, message.data]);
    };

    return () => {
      socket.close();
    };
  }, []);

  if (!socket) {
    return (
      <>
        <h2>Connecting to websocket ....</h2>
      </>
    );
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Your message goes here.."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          onClick={() => {
            socket.send(message);
          }}
        >
          Send
        </button>
        <div>
          {messages.map((m) => {
            return <ul>{m}</ul>;
          })}
        </div>
      </div>
    </>
  );
}

export default App;

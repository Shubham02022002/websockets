import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import "./App.css";
function App() {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080");
        socket.onopen = () => {
            console.log("Socket opened");
            setSocket(socket);
        };
        socket.onmessage = (message) => {
            console.log("Message: ", message.data);
        };
    }, []);
    if (!socket) {
        return (_jsx(_Fragment, { children: _jsx("h2", { children: "Connecting to websocket ...." }) }));
    }
    return (_jsx(_Fragment, { children: _jsx("h1", { children: "hi there" }) }));
}
export default App;
//# sourceMappingURL=App.js.map
import { useContext } from "react";
import { socket } from "../socket";
import { ChatContext } from "../App";

const ChatHeader = () => {
  const { state } = useContext(ChatContext);
  return (
    <header className="text-black p-2 font-bold flex border-b">
      {state.user.username && (
        <h1 className="flex divide-x divide-black/33 border border-black/33 rounded text-sm [&>span]:px-2">
          <span>Username</span> <span>{state.user.username}</span>
        </h1>
      )}
      <p className="text-xs flex justify-center items-center gap-1 ml-auto">
        <span>{socket.connected ? <>Active</> : <>Inactive</>}</span>
        <span
          aria-label="status"
          className={`status status-md ${
            socket.connected ? "status-success" : "status-error"
          }`}
        />
      </p>
    </header>
  );
};

export default ChatHeader;

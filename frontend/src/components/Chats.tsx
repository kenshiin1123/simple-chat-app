import { useContext } from "react";
import Chat from "./Chat";
import { ChatContext } from "../App";

const Chats = () => {
  const { state } = useContext(ChatContext);
  return (
    <ul className="p-3 h-[85%] overflow-y-scroll space-y-4">
      {state.chats.length < 1 && (
        <h1 className="text-black font-bold text-center animate-pulse">
          No chats available
        </h1>
      )}
      {state.chats.map((chat, i) => {
        return <Chat chat={chat} key={i} />;
      })}
    </ul>
  );
};

export default Chats;

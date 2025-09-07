import React from "react";
import Chat from "./Chat";
import type { ChatType } from "../types";

const Chats: React.FC<{ chats: ChatType[] }> = ({ chats }) => {
  return (
    <ul className="p-10 h-[85%] overflow-y-scroll">
      {chats.length < 1 && (
        <h1 className="text-black font-bold text-center animate-pulse">
          No chats available
        </h1>
      )}
      {chats.map((chat, i) => {
        console.log(chat);
        return <Chat key={i} />;
      })}
    </ul>
  );
};

export default Chats;

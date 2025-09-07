import React, { useContext } from "react";
import type { ChatType, UserType } from "../types";
import { ChatContext } from "../App";
const Chat: React.FC<{ chat: ChatType }> = ({ chat }) => {
  const { state } = useContext(ChatContext);
  const userId: UserType["userId"] = state.user.userId;

  return (
    <li
      className={`chat ${userId !== chat.userId ? " chat-start" : "chat-end"}`}
    >
      <div className="chat-bubble">
        <h1>{chat.message}</h1>
        {userId !== chat.userId && (
          <p className="font-bold text-xs mt-2">{chat.sender}</p>
        )}
      </div>
    </li>
  );
};

export default Chat;

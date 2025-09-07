import React, { useContext } from "react";
import type { ChatType, UserType } from "../types";
import { ChatContext } from "../App";
import { motion } from "motion/react";

const Chat: React.FC<{ chat: ChatType }> = ({ chat }) => {
  const { state } = useContext(ChatContext);
  const userId: UserType["userId"] = state.user.userId;
  const userChat = userId === chat.userId;

  const animate = {
    x: userChat ? [20, 0] : [-20, 0],
    opacity: [0, 1],
  };

  return (
    <li className={`chat ${!userChat ? " chat-start" : "chat-end"}`}>
      <motion.div
        className={`chat-bubble`}
        animate={animate}
        transition={{ duration: 0.39 }}
      >
        <h1>{chat.message}</h1>
        {!userChat && <p className="font-bold text-xs mt-2">{chat.sender}</p>}
      </motion.div>
    </li>
  );
};

export default Chat;

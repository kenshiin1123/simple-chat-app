import React, { useContext, useEffect, useState } from "react";
import type { ChatType, UserType } from "../types";
import { toast } from "sonner";
import { ChatContext } from "../App";
const Chat: React.FC<{ chat: ChatType }> = ({ chat }) => {
  const { state } = useContext(ChatContext);
  const userId: UserType["userId"] = state.user.userId;
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    if (userId) {
      const fetchUserById = async (userId: UserType["userId"]) => {
        const { VITE_BACKEND_URL } = import.meta.env;
        const response = await fetch(`${VITE_BACKEND_URL}/users/${userId}`);
        const { success, message, data } = await response.json();
        if (!success) return toast.error(message);

        setUser(data);
      };

      fetchUserById(userId);
    }
  }, []);
  return (
    <li
      className={`chat ${userId !== chat.userId ? " chat-start" : "chat-end"}`}
    >
      <div className="chat-bubble">
        <h1>{chat.message}</h1>
        <p>{user?.username}</p>
      </div>
    </li>
  );
};

export default Chat;

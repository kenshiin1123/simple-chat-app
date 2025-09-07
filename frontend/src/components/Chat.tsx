import React from "react";
const Chat: React.FC<{ start?: boolean }> = ({ start = false }) => {
  return (
    <li className={`chat ${start ? " chat-start" : "chat-end"}`}>
      <div className="chat-bubble">Chat 1</div>
    </li>
  );
};

export default Chat;

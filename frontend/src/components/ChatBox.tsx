import { useContext, type FormEvent } from "react";
import { toast } from "sonner";
import type { ChatType, StateType } from "../types";
import { v4 as uuid } from "uuid";
import { socket } from "../socket";
import { ChatContext } from "../App";

const ChatBox = () => {
  const { state, setState } = useContext(ChatContext);
  const userId = state.user.userId;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message");
    if (!message || message === "")
      return toast.error("Please fill the message");

    const newChat: ChatType = {
      chatId: uuid(),
      message: message.toString(),
      userId: userId,
    };

    socket.emit("new_chat", newChat);

    setState((prevState: StateType) => {
      return { ...prevState, chats: [...prevState.chats, newChat] };
    });

    event.currentTarget.reset();
  };

  return (
    <form className="h-[15%] w-full join border divide-x" onSubmit={onSubmit}>
      <input
        type="text"
        name="message"
        className="h-full w-full bg-gray-800 indent-3"
      />
      <button className="btn h-full w-20">Send</button>
    </form>
  );
};

export default ChatBox;

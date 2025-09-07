import { useContext, useRef, type FormEvent } from "react";
import { toast } from "sonner";
import type { ChatType, StateType } from "../types";
import { v4 as uuid } from "uuid";
import { socket } from "../socket";
import { ChatContext } from "../App";

const ChatBox = () => {
  const { state, setState } = useContext(ChatContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message");
    if (!message || message === "")
      return toast.error("Please fill the message");

    const newChat: ChatType = {
      chatId: uuid(),
      message: message.toString(),
      userId: state.user.userId,
      sender: state.user.username,
    };

    socket.emit("new_chat", newChat);

    setState((prevState: StateType) => {
      return { ...prevState, chats: [...prevState.chats, newChat] };
    });

    event.currentTarget.reset();
    inputRef.current!.focus();
  };

  return (
    <form className="h-[15%] w-full join border divide-x" onSubmit={onSubmit}>
      <input
        ref={inputRef}
        type="text"
        name="message"
        autoComplete="off"
        className="h-full w-full bg-black indent-3 "
      />
      <button className="btn h-full w-20">Send</button>
    </form>
  );
};

export default ChatBox;

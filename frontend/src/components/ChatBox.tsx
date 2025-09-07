import type { FormEvent } from "react";
import { toast } from "sonner";

const ChatBox = () => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message");
    if (!message || message === "")
      return toast.error("Please fill the message");

    toast.success(`Your message: ${message}`);
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

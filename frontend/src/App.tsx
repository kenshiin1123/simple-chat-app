import { createContext, useEffect, useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatContainer from "./components/ChatContainer";
import Chats from "./components/Chats";
import MainContainer from "./components/MainContainer";
import { toast, Toaster } from "sonner";
import GetUserDialog from "./components/GetUserDialog";
import type { ChatType, StateType } from "./types";
import { socket } from "./socket";
import ChatHeader from "./components/ChatHeader";

const initialState: StateType = {
  user: { username: "", userId: "" },
  chats: [],
  connected: false,
};

export const ChatContext = createContext<{
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
}>({
  state: initialState,
  setState: () => {},
});

const App = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (state.user.userId !== "" || state.user.username !== "") {
      socket.emit("new_user", state.user);
    }
  }, [state.user]);

  useEffect(() => {
    const getChats = async () => {
      const { VITE_BACKEND_URL } = import.meta.env;
      const response = await fetch(`${VITE_BACKEND_URL}/chats`);
      const { success, message, data } = await response.json();
      if (!success) return toast.error(message);

      setState((prevState: StateType) => {
        return { ...prevState, chats: data };
      });
    };
    getChats();
  }, []);

  useEffect(() => {
    const handleReceiveChat = (receivedChat: ChatType) => {
      setState((prevState: StateType) => {
        return { ...prevState, chats: [...prevState.chats, receivedChat] };
      });
    };

    socket.on("receive_chat", handleReceiveChat);

    return () => {
      socket.off("receive_chat", handleReceiveChat);
    };
  }, [socket]);

  return (
    <MainContainer>
      <ChatContext.Provider value={{ state, setState }}>
        <ChatContainer>
          <ChatHeader />
          <Chats />
          <ChatBox />
        </ChatContainer>
        <Toaster />
        <GetUserDialog />
      </ChatContext.Provider>
    </MainContainer>
  );
};

export default App;

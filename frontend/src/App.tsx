import { useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatContainer from "./components/ChatContainer";
import Chats from "./components/Chats";
import MainContainer from "./components/MainContainer";
import { Toaster } from "sonner";
import GetUserDialog from "./components/GetUserDialog";
import type { StateType } from "./types";

const initialState: StateType = {
  user: { username: "", userId: "" },
  chats: [],
  connected: false,
};

const App = () => {
  const [state, setState] = useState(initialState);

  return (
    <MainContainer>
      <ChatContainer>
        <Chats chats={state.chats} />
        <ChatBox />
      </ChatContainer>
      <Toaster />
      <GetUserDialog user={state.user} setState={setState} />
    </MainContainer>
  );
};

export default App;

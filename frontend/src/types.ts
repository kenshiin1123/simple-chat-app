export type UserType = {
  username: string;
  userId: string;
};

export type ChatType = {
  message: string;
  chatId: string;
  userId: UserType["userId"];
  sender: UserType["username"];
};

export type StateType = {
  user: UserType;
  chats: ChatType[];
  connected: boolean;
};

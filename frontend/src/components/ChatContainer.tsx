import type { PropsWithChildren } from "react";

const ChatContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-100 w-[95%] sm:w-130 bg-primary-content card flex flex-col justify-between">
      {children}
    </div>
  );
};

export default ChatContainer;

import React, { type PropsWithChildren } from "react";

const MainContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen">{children}</div>
  );
};

export default MainContainer;

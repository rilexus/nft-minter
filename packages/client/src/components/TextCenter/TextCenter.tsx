import React, { FC } from "react";

const TextCenter: FC = ({ children }) => {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
};

export { TextCenter };

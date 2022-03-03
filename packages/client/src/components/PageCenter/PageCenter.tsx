import React, { FC } from "react";
import { useCSSProperties } from "@nightfall-ui/hooks";

const PageCenter: FC = ({ children }) => {
  const style = useCSSProperties(
    {
      maxWidth: "1024px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    []
  );
  return <div style={style}>{children}</div>;
};

export { PageCenter };

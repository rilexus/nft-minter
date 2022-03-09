import React, { CSSProperties, FC, HTMLAttributes } from "react";
import { useCSSProperties } from "@nightfall-ui/hooks";

const Progress: FC<
  {
    value: number;
    max: number;
    progressStyle?: CSSProperties;
    backgroundStyle?: CSSProperties;
  } & HTMLAttributes<HTMLProgressElement>
> = ({ progressStyle, backgroundStyle, value, max, children, ...props }) => {
  const bg = useCSSProperties(
    {
      height: "10px",
      width: "500px",
      borderRadius: "9999px",
      position: "relative",
      backgroundColor: "rgba(38,38,38,0.65)",
      ...backgroundStyle,
    },
    [backgroundStyle]
  );

  const p = useCSSProperties(
    {
      width: `${max * 0.01 * value}%`,
      ...progressStyle,
      height: "10px",
      borderRadius: "9999px",
      transition: "width 200ms linear 0ms",
      backgroundColor: "rgba(234,234,234,0.65)",
    },
    [progressStyle]
  );
  const ps = useCSSProperties(
    {
      display: "none",
    },
    []
  );

  return (
    <div style={bg} className={"progress-bg"}>
      <div style={p} className={"progress-progress"} />
      <progress style={ps} {...props} value={value} max={max}>
        {children}
      </progress>
    </div>
  );
};

export { Progress };

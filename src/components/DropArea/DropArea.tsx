import React, { CSSProperties, forwardRef, useState } from "react";
import { TextCenter } from "../TextCenter";
import { UploadIcon } from "@icons";
import { useCSSProperties } from "@nightfall-ui/hooks";
import { BodyRegular, Title2 } from "@nightfall-ui/typography";

const DropArea = forwardRef<
  HTMLDivElement,
  {
    loading?: boolean;
    width?: string;
    height?: string;
    style?: CSSProperties;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  }
>(function DropArea({ style, onDrop }, outsideRef) {
  const [over, setOver] = useState(false);

  const s = useCSSProperties(
    {
      transition: "border 200ms ease 0ms",
      border: `3px dashed ${over ? "blue" : "gray"}`,
      borderRadius: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      ...style,
    },
    [style, over]
  );

  //TODO: memo event handlers
  return (
    <div
      style={s}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(e);
        setOver(false);
      }}
      onDragEnter={() => {
        setOver(true);
      }}
      onDragLeave={() => {
        setOver(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <div
        ref={outsideRef}
        style={{
          pointerEvents: "none",
        }}
      >
        <TextCenter>
          <Title2 type={"primary"} weight={"bold"}>
            Upload
          </Title2>
          <UploadIcon fill={"gray"} width={"50px"} height={"50px"} />
          <BodyRegular type={"secondary"}>Drag & Drop</BodyRegular>
        </TextCenter>
      </div>
      <form>
        <input
          type="file"
          id={"files"}
          // onChange={handleChange}
          style={{
            display: "none",
          }}
        />
      </form>
    </div>
  );
});

export { DropArea };

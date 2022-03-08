import React, {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  useRef,
  useState,
} from "react";
import { TextCenter } from "../TextCenter";
import { UploadIcon } from "@icons";
import { useCSSProperties } from "@nightfall-ui/hooks";
import { BodyRegular, Title2 } from "@nightfall-ui/typography";
import { useDragAndDrop } from "@hooks";
import { mergeRefs } from "@nightfall-ui/utils";
import { FilePreview } from "@components/DropArea/components";
import { CloseFilled } from "@nightfall-ui/icons";

const require = (condition: boolean, callback: () => void) => {
  if (condition) {
    callback();
  }
};

const DropArea = forwardRef<
  HTMLInputElement,
  HTMLAttributes<HTMLInputElement> & {
    width?: string;
    height?: string;
    accept?: string;
    style?: CSSProperties;
    onDrop?: (files: { dataTransfer?: { files: FileList } }) => void;
  }
>(function DropArea({ style, onDrop, children, ...props }, outsideRef) {
  const [over, setOver] = useState(false);
  const inputRef = useRef<any>(null);
  const [highlight, setHighlight] = useState(false);
  const [files, setFiles] = useState<any>(null); // TODO: add types

  const s = useCSSProperties(
    {
      transition: "border 250ms ease 0ms, transform 250ms ease 0ms",
      border: `3px dashed ${over || highlight ? "white" : "gray"}`,
      borderRadius: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transformOrigin: "50% 50%",
      cursor: !!files ? "default" : "pointer",
      transform: `scale(${over || highlight ? 1.02 : 1})`,
      overflow: "hidden",
      ...style,
    },
    [style, over, highlight, files]
  );

  const dragAndDropRef = useDragAndDrop((e: any) => {
    const { type } = e;
    switch (type) {
      case "drop": {
        e.preventDefault();
        onDrop?.(e);
        setOver(false);
        return;
      }
      case "dragleave": {
        setOver(false);
        return;
      }
      case "dragenter": {
        setOver(true);
        return;
      }
      case "dragover": {
        e.preventDefault();
        return;
      }
      default: {
        return;
      }
    }
  });

  const reset = () => {
    inputRef.current.value = "";
    setFiles(null);
  };

  return (
    <div
      ref={dragAndDropRef}
      style={{
        padding: "1rem",
        display: "inline-block",
        position: "relative",
      }}
      onMouseEnter={() => {
        setHighlight(true);
      }}
      onMouseLeave={() => {
        setHighlight(false);
      }}
      onClick={() => {
        require(!files, () => {
          reset();
          inputRef.current?.click();
        });
      }}
      onDrop={(e) => {
        const dataTransfer = e.dataTransfer;
        setFiles(dataTransfer.files);
      }}
    >
      <div style={s}>
        <div>
          {!files && (
            <TextCenter>
              <div
                style={{
                  margin: "2rem",
                  pointerEvents: "none",
                }}
              >
                <Title2 type={"primary"} weight={"bold"}>
                  File
                </Title2>
                <UploadIcon fill={"gray"} width={"50px"} height={"50px"} />
                <BodyRegular type={"secondary"}>Drop or Click</BodyRegular>
              </div>
            </TextCenter>
          )}

          {files && (
            <FilePreview
              file={files[0]}
              style={{
                width: "100%",
              }}
            />
          )}
        </div>
      </div>
      {files && highlight && (
        <button
          onClick={reset}
          style={{
            position: "absolute",
            top: "0rem",
            right: "-0.5rem",
            cursor: "pointer",
            outline: "none",
            backgroundColor: "transparent",
            border: "none",
          }}
        >
          <CloseFilled fill={"red"} height={"1.4rem"} width={"1.4rem"} />
        </button>
      )}
      <input
        {...props}
        type="file"
        id={"files"}
        onChange={(e) => {
          setFiles(e.target.files);
          props.onChange?.(e);
        }}
        ref={mergeRefs([outsideRef, inputRef])}
        style={{
          display: "none",
        }}
      />
      {children}
    </div>
  );
});

export { DropArea };

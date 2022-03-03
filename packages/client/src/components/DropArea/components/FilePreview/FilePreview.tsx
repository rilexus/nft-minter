import React, { CSSProperties, useEffect, useRef, VFC } from "react";
import { isImageType } from "../../../../utils";

const ImagePreview: VFC<{ file: File | undefined; style?: CSSProperties }> = ({
  file,
  style,
}) => {
  const ref = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    if (file && ref.current) {
      ref.current.src = URL.createObjectURL(file);
    }
  }, [ref, file]);
  return <img ref={ref} style={style} />;
};

const FilePreview: VFC<{ file: File | undefined; style?: CSSProperties }> = ({
  file,
  style,
}) => {
  if (isImageType(file?.type)) {
    return <ImagePreview file={file} style={style} />;
  }
  return <div />;
};

export { FilePreview };

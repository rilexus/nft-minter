import React, { useEffect, useRef, VFC } from "react";
import { isImageType } from "../../utils";

const ImagePreview: VFC<{ file: File | undefined }> = ({ file }) => {
  const ref = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    if (file && ref.current) {
      ref.current.src = URL.createObjectURL(file);
    }
  }, [ref, file]);
  return <img ref={ref} />;
};

const FilePreview: VFC<{ file: File | undefined }> = ({ file }) => {
  if (isImageType(file?.type)) {
    return <ImagePreview file={file} />;
  }
  return <div />;
};

export { FilePreview };

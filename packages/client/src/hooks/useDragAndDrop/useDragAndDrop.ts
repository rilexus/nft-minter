import { useEffect, useRef } from "react";

const useDragAndDrop = (callback: (e: DragEvent) => void) => {
  const callbackRef = useRef(callback);
  const ref = useRef<any>(null);

  useEffect(() => {
    if (callbackRef.current !== callback) {
      callbackRef.current = callback;
    }
  }, [callback, callbackRef]);

  useEffect(() => {
    const element = ref.current;

    const handle = (e: any) => {
      callbackRef.current(e);
    };

    element.addEventListener("dragenter", handle);
    element.addEventListener("dragleave", handle);
    element.addEventListener("drop", handle);
    element.addEventListener("dragover", handle);

    return () => {
      element.removeEventListener("dragenter", handle);
      element.removeEventListener("dragleave", handle);
      element.removeEventListener("drop", handle);
      element.removeEventListener("dragover", handle);
    };
  }, [ref]);

  return ref;
};
export { useDragAndDrop };

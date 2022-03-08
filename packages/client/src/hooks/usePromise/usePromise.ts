import { useCallback, useRef, useState } from "react";

const usePromise = <Return = any>(
  callback: (...args: any) => Promise<Return>
): [
  (...args: any) => Promise<{ data: Return; error: any }>,
  {
    error: any;
    loading: boolean;
    data: Return;
  }
] => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const [state, setState] = useState<{
    error: any;
    loading: boolean;
    data: any; //TODO type this
    status: "pending" | "resolved" | "rejected" | "idle";
  }>({
    error: null,
    loading: false,
    status: "idle",
    data: null,
  });

  const call = useCallback(
    async (...args) => {
      setState((s) => ({ ...s, loading: true, status: "pending" }));
      let data: any = null;
      let error: any = null;
      try {
        data = await callbackRef.current(...args);
        setState((s) => ({
          ...s,
          loading: false,
          data: data,
          error: null,
          status: "resolved",
        }));
      } catch (e) {
        error = e;
        setState((s) => ({
          ...s,
          loading: false,
          data: null,
          error: error,
          status: "rejected",
        }));
      }
      return { data, error };
    },
    [callbackRef]
  );

  return [call, state];
};
export { usePromise };

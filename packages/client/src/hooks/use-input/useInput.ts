import { useState } from "react";

const useInput = (name: string) => {
  const [value, setValue] = useState("");

  return {
    value,
    onChange: (e: any) => {
      const v = e.target.value;
      setValue(v);
    },
  };
};

export { useInput };

import { useState } from "react";

export function useEditableValue(initial = "") {
  const [value, setValue] = useState<string>(initial);
  const backspace = () => setValue((v) => v.slice(0, -1));
  const clear = () => setValue("");
  return { value, setValue, backspace, clear };
}
import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from "react";

import { useCreateTheme } from "@/components/atoms/createTheme.atom";
import { useCreateHint } from "@/components/atoms/createHint.atom";

import { ThemeInfoTextAreaType } from "./TextAreaType";

const useTextArea = ({
  id,
  content,
  checkErrorText,
}: ThemeInfoTextAreaType) => {
  const [textAreaValue, setTextAreaValue] = useState<string>(content || "");
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [, setCreateHint] = useCreateHint();
  const [, setCreateTheme] = useCreateTheme();

  useEffect(() => {
    if (errorText) return;
    setCreateTheme((prev) => ({
      ...prev,
      [id]: textAreaValue,
    }));
    setCreateHint((prev) => ({
      ...prev,
      [id]: textAreaValue,
    }));
  }, [textAreaValue, id, setCreateTheme, setCreateHint, errorText]);

  useEffect(() => {
    if (!isFocus || !textAreaRef.current) {
      setErrorText("");
      return;
    }
    textAreaRef.current.focus();
  }, [isFocus]);

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const cur = e.target.value;
    const error = checkErrorText ? checkErrorText(cur) : "";
    if (error) {
      setErrorText(error);
      setTextAreaValue(textAreaValue);
      return;
    }
    setErrorText("");
    setTextAreaValue(cur);
  };

  const handleTextAreaBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (
      !e.relatedTarget ||
      (e.relatedTarget.className !== "theme-info focus" &&
        e.relatedTarget.className !== "theme-info error")
    ) {
      setIsFocus(false);
      return;
    }
    textAreaRef.current?.focus();
    setIsFocus(true);
  };

  return {
    textAreaValue,
    isFocus,
    setIsFocus,
    errorText,
    textAreaRef,
    handleTextAreaChange,
    handleTextAreaBlur,
  };
};

export default useTextArea;

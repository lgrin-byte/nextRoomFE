import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import * as S from "./ActiveInput.styled";

export interface ActiveInputProps {
  type?: string;
  placeholder?: string | number;
  multiline?: boolean;
  register: UseFormRegisterReturn;
}
function ActiveInput(props: ActiveInputProps) {
  const {
    multiline = false,
    type = "text",
    placeholder = "",
    register,
  } = props;

  const [inputActive, setInputActive] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>("");

  const switchActive = () => {
    setInputActive(!inputActive);
  };

  const onBlur = (
    e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) => {
    switchActive();
    register.onBlur(e);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDisplayName(e.target.value);
    register.onChange(e);
  };

  return (
    <>
      <S.TextField
        {...register}
        type={type}
        placeholder={String(placeholder)}
        onChange={onChange}
        onBlur={onBlur}
        inputActive={inputActive}
        multiline={multiline}
        variant="standard"
        fullWidth
      />
      <S.FormText onClick={switchActive} inputActive={inputActive}>
        {displayName || placeholder}
      </S.FormText>
    </>
  );
}

export default ActiveInput;

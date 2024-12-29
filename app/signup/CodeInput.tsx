import React, { useRef, useEffect } from "react";

import { useSignUpValue } from "@/components/atoms/signup.atom";
import { usePostVerification } from "@/mutations/postVerification";

import * as S from "./SignUpView.styled";

interface Props {
  disabled: boolean;
  numbers: string[];
  setNumbers: (newNumbers: string[]) => void;
}

export default function CodeInput(props: Props) {
  const { disabled, numbers, setNumbers } = props;
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array.from({ length: 6 }, () => null)
  );

  const { mutateAsync: postVerification, isError = false } =
    usePostVerification();
  const signUpState = useSignUpValue();

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d$/.test(value)) return;

    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 1000);
  }, []);

  useEffect(() => {
    const isInputComplete = numbers.every((number: string) => number !== "");
    if (isInputComplete) {
      const code = numbers.join("");
      postVerification({ code, email: signUpState.email });
      if (isError) {
        setTimeout(() => {
          setNumbers(Array(6).fill(""));
          inputRefs.current[0]?.focus();
        }, 1000);
      }
    }
  }, [numbers, isError]);

  const handleInputDelete = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      const newNumbers = [...numbers];
      newNumbers[index] = "";
      setNumbers(newNumbers);

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <S.CodeWrap>
      {numbers.map((number, index) => (
        <S.CodeInput
          key={index}
          type="number"
          value={number}
          error={isError && numbers.join("").length === 0}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleInputDelete(index, e)}
          maxLength={1}
          ref={(input) => {
            inputRefs.current[index] = input;
          }}
          disabled={disabled}
          inputMode="numeric"
        />
      ))}
    </S.CodeWrap>
  );
}

import React from "react";
import { Button, Input } from "@mui/material";

import * as S from "./HintManagerView.styled";

interface Props {
  errorMsg: string;
  progressInputProps: Record<string, any>;
  hintCodeInputProps: Record<string, any>;
  contentsInputProps: Record<string, any>;
  answerInputProps: Record<string, any>;
  deleteButtonProps: Record<string, any>;
  formProps: Record<string, any>;
  makeHintButtonProps: Record<string, any>;
  isCurrentHintActive: boolean;
  wrapperProps: { onClick: (event: React.MouseEvent) => void };
}

const DELETE = "삭제하기";
const MAKE_HINT = "저장하기";

function HintManagerView(props: Props) {
  const {
    progressInputProps,
    hintCodeInputProps,
    contentsInputProps,
    answerInputProps,
    deleteButtonProps,
    makeHintButtonProps,
    formProps,
    isCurrentHintActive,
    wrapperProps,
    errorMsg,
  } = props;

  return (
    <S.StyledBox {...formProps}>
      <S.Wrapper selected={isCurrentHintActive}>
        <S.InputsWrapper {...wrapperProps}>
          <Input className="inputBox" {...hintCodeInputProps} />
          <Input className="inputBox" {...progressInputProps} />
          <Input className="TextareaBox" {...contentsInputProps} />
          <Input className="TextareaBox" {...answerInputProps} />
        </S.InputsWrapper>
        <S.ErrorMsgWrapper>{errorMsg}</S.ErrorMsgWrapper>
        <S.FunctionButtonsWrapper {...wrapperProps}>
          <Button {...deleteButtonProps}>{DELETE}</Button>
          <Button {...makeHintButtonProps}>{MAKE_HINT}</Button>
        </S.FunctionButtonsWrapper>
      </S.Wrapper>
    </S.StyledBox>
  );
}

export default HintManagerView;

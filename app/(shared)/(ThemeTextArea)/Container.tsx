import React from "react";
import "./textArea.modules.sass";
import classNames from "classnames";

import useTextArea from "./useTextArea";
import { ThemeInfoTextAreaType } from "./TextAreaType";

export default function ThemeTextArea({
  id,
  tabIndex,
  content,
  infoText,
  textAreaPlaceholder,
  checkErrorText,
}: ThemeInfoTextAreaType) {
  const {
    textAreaValue,
    isFocus,
    setIsFocus,
    errorText,
    textAreaRef,
    handleTextAreaChange,
    handleTextAreaBlur,
  } = useTextArea({ id, content, checkErrorText });

  return (
    <div tabIndex={isFocus ? -1 : tabIndex} onFocus={() => setIsFocus(true)}>
      <textarea
        ref={textAreaRef}
        className={classNames("theme-textarea", {
          error: errorText,
          filled: textAreaValue && !(errorText || isFocus),
        })}
        value={textAreaValue}
        placeholder={textAreaPlaceholder}
        onChange={handleTextAreaChange}
        onBlur={handleTextAreaBlur}
        tabIndex={tabIndex}
      />

      {errorText && (
        <div className="theme-textfield-info error" tabIndex={-1}>
          {errorText}
        </div>
      )}
      {infoText && (
        <div className="theme-textfield-info" tabIndex={-1}>
          {infoText}
        </div>
      )}
    </div>
  );
}

import { useCreateThemeValue } from "@/components/atoms/createTheme.atom";
import classNames from "classnames";
import React from "react";

export default function CreateThemeAddButton() {
  const createTheme = useCreateThemeValue();
  const isDisabled = !(
    createTheme.title &&
    createTheme.hintLimit &&
    createTheme.timeLimit
  );
  return (
    <button
      type="submit"
      className={classNames("create-theme__add-button", {
        disable: isDisabled,
      })}
    >
      테마 추가
    </button>
  );
}

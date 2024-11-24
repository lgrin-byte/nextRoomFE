import { ThemeInfoTextFieldType } from "@/(shared)/(ThemeTextField)/TextFieldType";
import { ThemeInfoTextAreaType } from "@/(shared)/(ThemeTextArea)/TextAreaType";

import {
  codeValidations,
  progressValidations,
} from "../helpers/textFieldHelpers";

export const codeTextFieldProps: ThemeInfoTextFieldType = {
  id: "hintCode",
  tabIndex: 1,
  title: "힌트 코드(숫자 4자리)",
  content: "",
  infoText: "",
  inputType: "text",
  inputPlaceholder: "",
  checkErrorText: codeValidations,
};

export const rateTextFieldProps: ThemeInfoTextFieldType = {
  id: "progress",
  tabIndex: 2,
  title: "문제 진행률(%)",
  content: "",
  infoText: "",
  inputType: "number",
  inputPlaceholder: "",
  checkErrorText: progressValidations,
};

export const hintTextAreaProps: ThemeInfoTextAreaType = {
  id: "contents",
  tabIndex: 3,
  content: "",
  infoText: "",
  textAreaPlaceholder: "힌트 내용을 입력해 주세요.",
};

export const answerTextAreaProps: ThemeInfoTextAreaType = {
  id: "answer",
  tabIndex: 4,
  content: "",
  infoText: "",
  textAreaPlaceholder: "정답 내용을 입력해 주세요.",
};

export const XImageProps = {
  src: "/images/svg/icon_X.svg",
  alt: "x_button",
  width: 24,
  height: 24,
};

export const HintImageProps = {
  src: "/images/svg/hint.svg",
  alt: "hint_help_image",
  width: 177,
  height: 127,
};

export const GalleryImageProps = {
  src: "/images/svg/icon_gallery_white.svg",
  alt: "gallery_image",
  width: 11,
  height: 11,
};

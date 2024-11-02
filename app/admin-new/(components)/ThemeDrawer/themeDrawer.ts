import { ThemeInfoTextFieldType } from "@/(shared)/(ThemeTextField)/TextFieldType";

const codeValidations = (value: unknown) => {
  const strValue = value as string;
  const numValue = Number(strValue);
  if (
    Number.isNaN(numValue) ||
    strValue.includes(".") ||
    strValue.includes("e")
  ) {
    return "숫자로 입력해 주세요.";
  }
  if (numValue > 9999) {
    return "4자리 입력해주세요.";
  }
  // TOOD: 다른 힌트에서 사용중인 힌트코드 조회
  return "";
};

const progressValidations = (value: unknown) => {
  const strValue = value as string;
  const numValue = Number(strValue);
  if (
    Number.isNaN(numValue) ||
    strValue.includes(".") ||
    strValue.includes("e")
  ) {
    return "숫자로 입력해 주세요.";
  }
  if (strValue.length > 0 && numValue <= 0) {
    return "1 이상으로 입력해 주세요.";
  }
  if (numValue > 100) {
    return "100 이하로 입력해 주세요.";
  }
  return "";
};

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
  tabIndex: 1,
  title: "문제 진행률(%)",
  content: "",
  infoText: "",
  inputType: "text",
  inputPlaceholder: "",
  checkErrorText: progressValidations,
};

export const XImageProps = {
  src: "/images/svg/icon_X.svg",
  alt: "x_button",
  width: 28,
  height: 28,
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

import { ThemeInfoTextFieldType } from "../(types)/createThemeType";

export const CREATE_THEME_TITLE_TEXT = "테마 정보를 입력해 주세요";

export const nameTextFieldProps: ThemeInfoTextFieldType = {
  title: "테마 이름",
  content: "",
  infoText: "손님에게는 테마 이름이 노출되지 않아요",
  inputType: "text",
  inputPlaceholder: "테마 이름을 입력해 주세요",
  checkError: undefined,
  validReg: "",
};

const timeValidations = (value: unknown) => {
  const strValue = value as string;
  const numValue = Number(strValue);
  if (isNaN(numValue) || strValue.includes(".") || strValue.includes("e")) {
    return "숫자로 입력해 주세요. (분 단위)";
  }
  if (strValue.length > 0 && numValue <= 0) {
    return "1분 이상 입력해 주세요.";
  }
  return "";
};

const hintValidations = (value: unknown) => {
  const strValue = value as string;
  const numValue = Number(strValue);
  if (isNaN(numValue) || strValue.includes(".") || strValue.includes("e")) {
    return "숫자로 입력해 주세요. (힌트 개수)";
  }
  return "";
};

export const timeTextFieldProps: ThemeInfoTextFieldType = {
  title: "탈출 제한 시간(분)",
  content: "",
  infoText: "",
  inputType: "text",
  inputPlaceholder: "분 단위 숫자로 입력해 주세요",
  checkError: timeValidations,
  validReg: "",
};

export const hintCountTextFieldProps: ThemeInfoTextFieldType = {
  title: "사용 가능한 힌트 수",
  content: "",
  infoText: "",
  inputType: "text",
  inputPlaceholder: "숫자로 입력해 주세요",
  checkError: hintValidations,
  validReg: "",
};

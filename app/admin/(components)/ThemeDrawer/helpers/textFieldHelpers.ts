export const codeValidations = (value: unknown) => {
  const strValue = value as string;
  const numValue = Number(strValue);
  if (
    Number.isNaN(numValue) ||
    strValue.includes(".") ||
    strValue.includes("e")
  ) {
    return "숫자로 입력해 주세요.";
  }
  if (strValue.length > 4) {
    return "네자리만 사용할 수 있습니다.";
  }
  if (numValue > 9999) {
    return "네자리만 사용할 수 있습니다.";
  }
  return "";
};

export const progressValidations = (value: unknown) => {
  const strValue = value as string;
  const numValue = Number(strValue);
  if (
    Number.isNaN(numValue) ||
    strValue.includes(".") ||
    strValue.includes("e")
  ) {
    return "숫자로 입력해 주세요.";
  }
  if (strValue.length > 0 && numValue < 0) {
    return "0 이상으로 입력해 주세요.";
  }
  if (numValue > 100) {
    return "100 이하로 입력해 주세요.";
  }
  return "";
};

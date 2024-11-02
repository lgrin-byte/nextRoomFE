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
  if (numValue > 9999) {
    return "4자리 입력해주세요.";
  }
  // TOOD: 다른 힌트에서 사용중인 힌트코드 조회
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
  if (strValue.length > 0 && numValue <= 0) {
    return "1 이상으로 입력해 주세요.";
  }
  if (numValue > 100) {
    return "100 이하로 입력해 주세요.";
  }
  return "";
};

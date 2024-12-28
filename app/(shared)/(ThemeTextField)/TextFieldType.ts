type ValidationFunction<T> = (value: T) => string;

export type ThemeInfoTextFieldType = {
  id: "title" | "timeLimit" | "hintLimit" | "progress" | "hintCode";
  tabIndex?: number;
  title?: string;
  content: string;
  infoText?: string;
  inputType?: "text" | "number";
  inputPlaceholder?: string;
  checkErrorText?: ValidationFunction<unknown>;
};

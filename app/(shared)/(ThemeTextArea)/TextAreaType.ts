type ValidationFunction<T> = (value: T) => string;

export type ThemeInfoTextAreaType = {
  id: "contents" | "answer";
  tabIndex?: number;
  title?: string;
  content: string;
  infoText?: string;
  textAreaPlaceholder?: string;
  checkErrorText?: ValidationFunction<unknown>;
};

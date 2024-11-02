import {
  atom,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";

export interface SelectedHintType {
  id: number;
  hintCode: string;
  progress: number;
  contents: string;
  answer: string;
  hintImageUrlList: string[];
  answerImageUrlList: string[];
}

export const InitialSelectedHint: SelectedHintType = {
  id: 0,
  hintCode: "",
  contents: "",
  answer: "",
  progress: 0,
  hintImageUrlList: [],
  answerImageUrlList: [],
};

const selectedHintState = atom<SelectedHintType>({
  key: "selectedHint",
  default: InitialSelectedHint,
});
export const useSelectedHint = () => useRecoilState(selectedHintState);
export const useSelectedHintValue = () => useRecoilValue(selectedHintState);
export const useSelectedHintWrite = () => useSetRecoilState(selectedHintState);
export const useSelectedHintReset = () =>
  useResetRecoilState(selectedHintState);

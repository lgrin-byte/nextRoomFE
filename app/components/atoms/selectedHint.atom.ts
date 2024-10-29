import {
  atom,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";

interface SelectedHint {
  id: number;
  hintCode: string;
  contents: string;
  answer: string;
  progress: number;
  hintImageUrlList: string[];
  answerImageUrlList: string[];
}

export const InitialSelectedHint: SelectedHint = {
  id: 0,
  hintCode: "",
  contents: "",
  answer: "",
  progress: 0,
  hintImageUrlList: [],
  answerImageUrlList: [],
};

const selectedHintState = atom<SelectedHint>({
  key: "selectedHint",
  default: InitialSelectedHint,
});
export const useSelectedHint = () => useRecoilState(selectedHintState);
export const useSelectedHintValue = () => useRecoilValue(selectedHintState);
export const useSelectedHintWrite = () => useSetRecoilState(selectedHintState);
export const useSelectedHintReset = () =>
  useResetRecoilState(selectedHintState);

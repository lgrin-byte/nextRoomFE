import {
  atom,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";

interface HintInfo {
  themeId: number;
  hintCode: string;
  progress: number;
  contents: string;
  answer: string;
  hintImageList: string[];
  answerImageList: string[];
}

const createHintState = atom<HintInfo>({
  key: "createHint",
  default: {
    themeId: 0,
    hintCode: "",
    progress: 0,
    contents: "",
    answer: "",
    hintImageList: [],
    answerImageList: [],
  },
});

export const useCreateHint = () => useRecoilState(createHintState);
export const useCreateHintValue = () => useRecoilValue(createHintState);
export const useCreateHintWrite = () => useSetRecoilState(createHintState);
export const useCreateHintReset = () => useResetRecoilState(createHintState);

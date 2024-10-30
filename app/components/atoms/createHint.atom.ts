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
  hintContent: string;
  hintAnswer: string;
}

const createHintState = atom<HintInfo>({
  key: "createHint",
  default: {
    themeId: 0,
    hintCode: "",
    progress: 0,
    hintContent: "",
    hintAnswer: "",
  },
});

export const useCreateHint = () => useRecoilState(createHintState);
export const useCreateHintValue = () => useRecoilValue(createHintState);
export const useCreateHintWrite = () => useSetRecoilState(createHintState);
export const useCreateHintReset = () => useResetRecoilState(createHintState);

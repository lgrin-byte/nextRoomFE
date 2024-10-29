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
}

const createHintState = atom<HintInfo>({
  key: "createHint",
  default: { themeId: 222, hintCode: "1235", progress: 12 },
});

export const useCreateHint = () => useRecoilState(createHintState);
export const useCreateHintValue = () => useRecoilValue(createHintState);
export const useCreateHintWrite = () => useSetRecoilState(createHintState);
export const useCreateHintReset = () => useResetRecoilState(createHintState);

import { SelectedHintType } from "./selectedHint.atom";
import {
  atom,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";

const createHintState = atom<SelectedHintType>({
  key: "createHint",
  default: {
    id: 0,
    hintCode: "",
    progress: 0,
    contents: "",
    answer: "",
    hintImageUrlList: [],
    answerImageUrlList: [],
  },
});

export const useCreateHint = () => useRecoilState(createHintState);
export const useCreateHintValue = () => useRecoilValue(createHintState);
export const useCreateHintWrite = () => useSetRecoilState(createHintState);
export const useCreateHintReset = () => useResetRecoilState(createHintState);

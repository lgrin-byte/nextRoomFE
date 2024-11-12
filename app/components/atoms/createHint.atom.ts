import {
  atom,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";

import { InitialSelectedHint, SelectedHintType } from "./selectedHint.atom";

const createHintState = atom<SelectedHintType>({
  key: "createHint",
  default: InitialSelectedHint,
});

export const useCreateHint = () => useRecoilState(createHintState);
export const useCreateHintValue = () => useRecoilValue(createHintState);
export const useCreateHintWrite = () => useSetRecoilState(createHintState);
export const useCreateHintReset = () => useResetRecoilState(createHintState);

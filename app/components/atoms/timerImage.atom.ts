import {
  atom,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
} from "recoil";

interface TimerImageType {
  timerImage: Blob | MediaSource | null;
}
const timerImage = atom<TimerImageType>({
  key: "timerImage",
  default: { timerImage: null },
});

export const useTimerImage = () => useRecoilState(timerImage);
export const useTimerImageValue = () => useRecoilValue(timerImage);
export const useTimerImageWrite = () => useSetRecoilState(timerImage);

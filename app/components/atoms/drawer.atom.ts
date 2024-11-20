import {
  atom,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
} from "recoil";

interface DrawerType {
  isOpen: boolean;
  hintType: string;
  isSameHint: boolean;
}

const drawerState = atom<DrawerType>({
  key: "drawer",
  default: { isOpen: false, hintType: "", isSameHint: false },
});

export const useDrawerState = () => useRecoilState(drawerState);
export const useDrawerStateValue = () => useRecoilValue(drawerState);
export const useDrawerStateWrite = () => useSetRecoilState(drawerState);

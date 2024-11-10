export interface OnCloseDrawerType {
  onCloseDrawer: () => void;
}

type HintType = {
  hintType: string;
  handleHintCreate: (type: string) => void;
};

export type DrawerType = OnCloseDrawerType & HintType;

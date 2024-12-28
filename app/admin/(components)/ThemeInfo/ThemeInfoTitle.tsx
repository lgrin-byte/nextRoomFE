import React from "react";

import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";

interface Props {
  handleOpenModal: () => void;
}
export default function ThemeInfoTitle({ handleOpenModal }: Props) {
  const selectedTheme = useSelectedThemeValue();
  return (
    <div className="theme-infomation__title">
      <div className="theme-infomation-fit" onClick={handleOpenModal}>
        <div className="title">{selectedTheme.title}</div>
        <div className="image" />
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import "../../(style)/themeInfo.modules.sass";
import useModal from "@/hooks/useModal";
import useClickOutside from "@/hooks/useClickOutside";
import Dialog from "@/components/common/Dialog-new/Dialog";
import HintDialog from "@/components/common/Hint-Dialog-new/Dialog";
import ThemeInfoTitle from "./ThemeInfoTitle";
import ThemeInfoBody from "./ThemeInfoBody";
import ThemeInfoHint from "./ThemeInfoHint";
import ThemeDrawer from "../ThemeDrawer/Container";

export default function ThemeInfo() {
  const { open } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    open(Dialog, { type: "put" });
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleOpenHintModal = () => {
    open(HintDialog, { type: "put", fn: onClose });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Enter 키 기본 동작 방지
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const drawerRef = useRef<HTMLFormElement>(null);

  return (
    <div className="theme-infomation">
      <ThemeInfoTitle handleOpenModal={handleOpenModal} />
      <ThemeInfoBody handleOpenModal={handleOpenModal} />
      <ThemeInfoHint
        handleHintCreate={() => {
          setIsOpen(true);
        }}
      />
      {isOpen && <ThemeDrawer onClose={onClose} />}
    </div>
  );
}

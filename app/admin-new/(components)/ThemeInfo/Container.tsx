import { useEffect, useState } from "react";
import "../../(style)/themeInfo.modules.sass";
import classNames from "classnames";

import useModal from "@/hooks/useModal";
import Dialog from "@/components/common/Dialog-new/Dialog";
import { useSelectedHintReset } from "@/components/atoms/selectedHint.atom";
import { useDrawerState } from "@/components/atoms/drawer.atom";

import ThemeDrawer from "../ThemeDrawer/Container";

import ThemeInfoTitle from "./ThemeInfoTitle";
import ThemeInfoBody from "./ThemeInfoBody";
import ThemeInfoHint from "./ThemeInfoHint";

export default function ThemeInfo() {
  const { open } = useModal();
  const resetSelectedHint = useSelectedHintReset();

  const [drawer, setDrawerState] = useDrawerState();

  const handleOpenModal = () => {
    open(Dialog, { type: "put" });
  };

  const handleCloseDrawer = () => {
    resetSelectedHint();
    setDrawerState({ ...drawer, isOpen: false, hintType: "" });
  };

  const handleHintCreate = (type: string) => {
    setDrawerState({ ...drawer, isOpen: true, hintType: type });
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

  return (
    <div
      className={classNames("theme-infomation", {
        "drawer-open": drawer.isOpen,
      })}
    >
      <ThemeInfoTitle handleOpenModal={handleOpenModal} />
      <ThemeInfoBody handleOpenModal={handleOpenModal} />
      <ThemeInfoHint handleHintCreate={handleHintCreate} />
      {drawer.isOpen && (
        <ThemeDrawer
          handleHintCreate={handleHintCreate}
          onCloseDrawer={handleCloseDrawer}
          hintType={drawer.hintType}
        />
      )}
    </div>
  );
}

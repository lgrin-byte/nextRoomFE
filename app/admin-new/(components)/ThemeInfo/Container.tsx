import { useEffect, useState } from "react";
import "../../(style)/themeInfo.modules.sass";
import classNames from "classnames";

import useModal from "@/hooks/useModal";
import Dialog from "@/components/common/Dialog-new/Dialog";
import { useSelectedHintReset } from "@/components/atoms/selectedHint.atom";

import ThemeDrawer from "../ThemeDrawer/Container";

import ThemeInfoTitle from "./ThemeInfoTitle";
import ThemeInfoBody from "./ThemeInfoBody";
import ThemeInfoHint from "./ThemeInfoHint";

export default function ThemeInfo() {
  const { open } = useModal();
  const resetSelectedHint = useSelectedHintReset();

  const [openHintDrawer, setOpenHintDrawer] = useState(false);
  const [hintType, setHintType] = useState<string>("Add");

  const handleOpenModal = () => {
    open(Dialog, { type: "put" });
  };

  const handleCloseDrawer = () => {
    resetSelectedHint();
    setOpenHintDrawer(false);
  };

  const handleHintCreate = (type: string) => {
    setOpenHintDrawer(true);
    setHintType(type);
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
        "drawer-open": openHintDrawer,
      })}
    >
      <ThemeInfoTitle handleOpenModal={handleOpenModal} />
      <ThemeInfoBody handleOpenModal={handleOpenModal} />
      <ThemeInfoHint handleHintCreate={handleHintCreate} />
      {openHintDrawer && (
        <ThemeDrawer
          handleHintCreate={handleHintCreate}
          onCloseDrawer={handleCloseDrawer}
          hintType={hintType}
        />
      )}
    </div>
  );
}

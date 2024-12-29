import React, { forwardRef, useRef } from "react";
import Image from "next/image";

import useClickOutside from "@/hooks/useClickOutside";
import useModal from "@/hooks/useModal";
import ModalPortal from "@/components/common/Dialog-new/ModalPortal";
import "@/components/common/Dialog-new/dialog.sass";
import {
  smallXProps,
  previewProps,
  statusBarProps,
} from "@/admin/(consts)/sidebar";
import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";

const PreviewDialog = forwardRef<HTMLDivElement>(() => {
  const selectedTheme = useSelectedThemeValue();
  const { close } = useModal();

  const timerPreviewProps = {
    src: selectedTheme.themeImageUrl!,
    alt: "timer priview image",
    width: 284,
    height: 555,
  };

  const divRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(divRef, close);

  return (
    <ModalPortal>
      <div className={`theme-preview-modal`} ref={divRef}>
        <div className="ttheme-info-modal__content">
          <p className="preview-dialog-caption">
            *예시 이미지입니다. 앱에서 세부 설정을 진행해 주세요.
          </p>
          <div className="preview_image">
            <Image className="preview" {...previewProps} />
            <Image className="status_bar" {...statusBarProps} />
            <Image className="mobile_preview" {...timerPreviewProps} />
          </div>
        </div>
        <button
          className="icon_secondary_button40"
          type="button"
          onClick={close}
        >
          <Image {...smallXProps} />
        </button>
      </div>
    </ModalPortal>
  );
});

export default PreviewDialog;

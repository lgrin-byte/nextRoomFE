import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import Dialog from "@/components/common/Dialog-new/Image-Dialog-new/Dialog";
import PreviewDialog from "@/components/common/Dialog-new/Preview-Dialog-new/PreviewDialog";
import useModal from "@/hooks/useModal";
import { useTimerImageWrite } from "@/components/atoms/timerImage.atom";
import { useSelectedTheme } from "@/components/atoms/selectedTheme.atom";
import { defaultTimerImage, QuestionIconProps } from "@/admin/(consts)/sidebar";
import DeleteDialog from "@/components/common/Dialog-new/Timer-Image-Delete-Dialog/DeleteDialog";
import Tooltip from "@/admin/(components)/Tooltip/Container";

export default function ThemeTimerImage() {
  const [selectedTheme, setSelectedTheme] = useSelectedTheme();
  const setTimerImage = useTimerImageWrite();

  const [timerImageUrl, setTimerImageUrl] = useState<string>(defaultTimerImage);
  useEffect(() => {
    if (selectedTheme.themeImageUrl) {
      setTimerImageUrl(selectedTheme.themeImageUrl);
      setSelectedTheme((prev) => ({
        ...prev,
        useTimerUrl: true,
        themeImageUrl: selectedTheme.themeImageUrl,
      }));
      return;
    }
    setTimerImageUrl(defaultTimerImage);
  }, [selectedTheme.themeImageUrl]);

  const TimerImageProps = {
    src: timerImageUrl || "",
    alt: "NEXT ROOM",
    width: 120,
    height: 120,
  };
  // console.log(timerImageUrl, selectedTheme, TimerImageProps);
  const { open } = useModal();

  const addImageInputRef = useRef<HTMLInputElement>(null);
  const fileReset = () => {
    if (addImageInputRef.current) {
      addImageInputRef.current.value = "";
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file: File = e.target.files[0];
    setTimerImage({ timerImage: file });

    if (file) {
      open(Dialog);
    }
    fileReset();
  };
  const handleAddTimerImageBtnClick = () => {
    addImageInputRef.current?.click();
  };
  const handlePreviewBtnClick = () => {
    open(PreviewDialog);
  };

  const handleDelTimerImageBtnClick = () => {
    open(DeleteDialog);
  };
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="theme_image__container">
      <div className="theme-image-title">
        <span>타이머 배경</span>
        <Image
          {...QuestionIconProps}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="tooptip-button"
        />
        {isHovered && <Tooltip />}
      </div>
      <div className="theme-images">
        <div className="theme-image-box">
          <Image {...TimerImageProps} />
          {selectedTheme.useTimerUrl && (
            <div
              className="theme-image-dimmed"
              onClick={handleDelTimerImageBtnClick}
            >
              <button className="button28" type="button">
                삭제
              </button>
            </div>
          )}
        </div>
        <input
          type="file"
          onChange={handleFileInputChange}
          accept="image/*"
          style={{ display: "none" }}
          ref={addImageInputRef}
        />
        {selectedTheme.useTimerUrl ? (
          <button
            className="secondary_button40"
            onClick={handlePreviewBtnClick}
          >
            미리보기
          </button>
        ) : (
          <button className="button40" onClick={handleAddTimerImageBtnClick}>
            배경 등록하기
          </button>
        )}
      </div>
    </div>
  );
}

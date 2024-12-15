import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";

import Dialog from "@/components/common/Dialog-new/Image-Dialog-new/Dialog";
import PreviewDialog from "@/components/common/Dialog-new/Preview-Dialog-new/PreviewDialog";
import useModal from "@/hooks/useModal";
import { useTimerImageWrite } from "@/components/atoms/timerImage.atom";

export default function ThemeTimerImage() {
  const QuestionProps = {
    src: "/images/svg/icon_question.svg",
    alt: "gallery_image",
    width: 24,
    height: 24,
  };

  const [isTimerImage, setIsTimerImage] = useState<boolean>(false);
  const [timerImageFile, setTimerImageFile] = useState<File>();
  const setTimerImage = useTimerImageWrite();

  const defaultTimerImage = "/images/svg/icon_preview.svg";
  const TimerImageProps = {
    src: isTimerImage ? "" : defaultTimerImage,
    alt: "NEXT ROOM",
    width: 120,
    height: 120,
  };
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
    setTimerImageFile(file);
    setTimerImage({ timerImage: file });

    if (file) {
      open(Dialog, { type: "put" });
    }
    fileReset();
    // console.log(file, "file");
  };
  const handleAddTimerImageBtnClick = () => {
    addImageInputRef.current?.click();
  };
  const handlePreviewBtnClick = () => {
    open(PreviewDialog, { type: "put" });
  };

  return (
    <div className="theme_image__container">
      <div className="theme-image-title">
        <span>타이머 배경</span>
        <Image {...QuestionProps} />
      </div>
      <div className="theme-images">
        <div className="theme-image-box">
          <Image {...TimerImageProps} />
          <div className="theme-image-dimmed">
            <button className="button28" type="button">
              삭제
            </button>
          </div>
        </div>
        <input
          type="file"
          onChange={handleFileInputChange}
          accept="image/*"
          style={{ display: "none" }}
          ref={addImageInputRef}
        />
        {isTimerImage ? (
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

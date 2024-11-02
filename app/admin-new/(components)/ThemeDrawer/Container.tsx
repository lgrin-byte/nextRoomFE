import ThemeTextField from "@/(shared)/(ThemeTextField)/Container";
import Image from "next/image";
import React, {
  FormEvent,
  useState,
  forwardRef,
  useRef,
  useEffect,
} from "react";
import HintDialog from "@/components/common/Hint-Dialog-new/Dialog";
import { useSelectedHint } from "@/components/atoms/selectedHint.atom";
import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";
import { useCreateHint } from "@/components/atoms/createHint.atom";
import useClickOutside from "@/hooks/useClickOutside";
import useHintUpload from "@/queries/getPreSignedUrl";
import useModal from "@/hooks/useModal";
import extractFilename from "@/utils/helper";
import ThemeDrawerAnswer from "./ThemeDrawerAnswer";
import ThemeDrawerHint from "./ThemeDrawerHint";
import {
  codeTextFieldProps,
  HintImageProps,
  rateTextFieldProps,
  XImageProps,
} from "./themeDrawer";

interface ThemeDrawerProps {
  onClose: () => void;
}

const ThemeDrawer = forwardRef(({ onClose }: ThemeDrawerProps) => {
  const [selectedHint] = useSelectedHint();
  const selectedTheme = useSelectedThemeValue();

  // State & Refs
  const [hintImages, setHintImages] = useState<File[]>([]);
  const [answerImages, setAnswerImages] = useState<File[]>([]);
  const [disableAddButton, setDisableAddButton] = useState(true);
  const { handleProcess } = useHintUpload();
  const [createHint, setCreateHint] = useCreateHint();

  const isDisabled =
    selectedHint.id > 0
      ? (String(createHint.hintCode) === String(selectedHint.hintCode) &&
          Number(createHint.progress) === Number(selectedHint.progress) &&
          String(createHint.contents) === String(selectedHint.contents) &&
          String(createHint.answer) === String(selectedHint.answer)) ||
        !(
          createHint.hintCode &&
          createHint.progress &&
          createHint.contents &&
          createHint.answer
        )
      : !(
          createHint.hintCode &&
          createHint.progress &&
          createHint.contents &&
          createHint.answer
        );

  useEffect(() => {
    if (
      createHint.hintCode &&
      createHint.hintCode.toString().length === 4 &&
      createHint.progress &&
      createHint.contents &&
      createHint.answer
    ) {
      setDisableAddButton(false);
      return;
    }
    setDisableAddButton(true);
  }, [createHint]);
  useEffect(() => {
    setCreateHint((prev) => ({
      ...prev,
      contents: selectedHint.contents,
      answer: selectedHint.answer,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Submit 핸들러
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      themeId: selectedTheme.id, // 실제 테마 ID
      hintCode: createHint.hintCode,
      contents: createHint.contents,
      answer: createHint.answer,
      progress: createHint.progress,
      id: selectedHint.id,
      hintImageList:
        selectedHint?.hintImageUrlList?.length > 0
          ? selectedHint.hintImageUrlList.map((url) => extractFilename(url))
          : [],
      answerImageList:
        selectedHint?.answerImageUrlList?.length > 0
          ? selectedHint.answerImageUrlList.map((url) => extractFilename(url))
          : [],
    };
    try {
      await handleProcess(formData, hintImages, answerImages);
    } catch (error) {
      console.error(error);
    }
    onClose();
  };
  const { open } = useModal();
  const handleOpenHintModal = () => {
    if (isDisabled) {
      onClose();
    } else {
      open(HintDialog, { type: "put", fn: onClose });
    }
  };
  const drawerRef = useRef(null);
  useClickOutside(drawerRef, handleOpenHintModal);

  const deleteHintBtn = () => {
    open(HintDialog, { type: "delete", fn: onClose });
  };

  return (
    <form
      className="theme-drawer__container"
      onSubmit={handleSubmit}
      ref={drawerRef}
    >
      <div className="theme-drawer__title">
        <span>힌트</span>
        <button type="button" onClick={onClose}>
          <Image {...XImageProps} />
        </button>
      </div>

      <div className="theme-drawer__content">
        <div className="drawer-code">
          <ThemeTextField
            {...codeTextFieldProps}
            content={selectedHint.hintCode.toString()}
          />
        </div>

        <div className="drawer-image-subtext-section">
          <div className="drawer-image-subtext-line" />
          <div className="drawer-image-subtext">보여질 내용</div>
        </div>

        <div className="drawer-image-section">
          <Image {...HintImageProps} />
        </div>

        <div className="drawer-rate">
          <div className="drawer-category-title">문제 진행률</div>
          <ThemeTextField
            {...rateTextFieldProps}
            content={
              selectedHint.progress !== 0
                ? selectedHint.progress.toString()
                : ""
            }
          />
        </div>

        <ThemeDrawerHint
          hintImages={hintImages}
          setHintImages={setHintImages}
        />

        <ThemeDrawerAnswer
          answerImages={answerImages}
          setAnswerImages={setAnswerImages}
        />
      </div>

      <div className="theme-drawer__footer">
        {selectedHint.id > 0 && (
          <button
            className="button40"
            type="button"
            onClick={deleteHintBtn}
            disabled={!selectedHint.id}
          >
            삭제하기
          </button>
        )}
        <button
          className="secondary_button40"
          type="submit"
          disabled={selectedHint.id > 0 ? isDisabled : disableAddButton}
        >
          {selectedHint.id > 0 ? "저장하기" : "추가하기"}
        </button>
      </div>
    </form>
  );
});

export default ThemeDrawer;

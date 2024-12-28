import Image from "next/image";

import { useSelectedHint } from "@/components/atoms/selectedHint.atom";
import ThemeTextField from "@/(shared)/(ThemeTextField)/Container";
import ThemeTextArea from "@/(shared)/(ThemeTextArea)/Container";

import ThemeDrawerAnswer from "./ThemeDrawerAnswer";
import ThemeDrawerHint from "./ThemeDrawerHint";
import {
  answerTextAreaProps,
  codeTextFieldProps,
  HintImageProps,
  hintTextAreaProps,
  rateTextFieldProps,
  XImageProps,
} from "./consts/themeDrawerProps";
import { DrawerType } from "./types/themeDrawerTypes";
import useEditHint from "./hooks/useEditHint";

const ThemeDrawer = ({ hintType, handleHintCreate }: DrawerType) => {
  const [selectedHint] = useSelectedHint();
  const {
    handleSubmit,
    drawerRef,
    hintImages,
    setHintImages,
    answerImages,
    setAnswerImages,
    isDisabled,
    isImcomplete,
    deleteHintBtn,
    handleOpenHintModal,
  } = useEditHint({ hintType, handleHintCreate });

  return (
    <form
      className="theme-drawer__container animate"
      onSubmit={handleSubmit}
      ref={drawerRef}
      key={selectedHint.id}
    >
      <div className="theme-drawer__title">
        <span>힌트</span>
        <button
          type="button"
          className="ghost_white_icon_button28"
          onClick={handleOpenHintModal}
        >
          <Image {...XImageProps} />
        </button>
      </div>

      <div className="theme-drawer__content">
        <div className="drawer-code">
          <ThemeTextField
            {...codeTextFieldProps}
            content={
              selectedHint.hintCode ? selectedHint.hintCode.toString() : ""
            }
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
              selectedHint.progress ? selectedHint.progress.toString() : ""
            }
          />
        </div>

        <ThemeDrawerHint
          imageType={"hint"}
          images={hintImages}
          setImages={setHintImages}
        />
        <ThemeTextArea
          {...hintTextAreaProps}
          content={selectedHint.contents ? selectedHint.contents : ""}
        />

        <ThemeDrawerAnswer
          imageType={"answer"}
          images={answerImages}
          setImages={setAnswerImages}
        />
        <ThemeTextArea
          {...answerTextAreaProps}
          content={selectedHint.answer ? selectedHint.answer : ""}
        />
      </div>

      {hintType === "Edit" ? (
        <div className="theme-drawer__footer">
          <button
            className="outlined_button40"
            type="button"
            onClick={deleteHintBtn}
          >
            삭제하기
          </button>
          <button className="button40" type="submit" disabled={isDisabled}>
            저장하기
          </button>
        </div>
      ) : (
        <div className="theme-drawer__footer">
          <button className="button40" type="submit" disabled={isImcomplete}>
            추가하기
          </button>
        </div>
      )}
    </form>
  );
};
export default ThemeDrawer;

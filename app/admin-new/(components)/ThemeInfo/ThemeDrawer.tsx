import ThemeTextField from "@/(shared)/(ThemeTextField)/Container";
import { ThemeInfoTextFieldType } from "@/(shared)/(ThemeTextField)/TextFieldType";
import Image from "next/image";
import React, {
  FormEvent,
  useRef,
  useState,
  forwardRef,
  ForwardedRef,
} from "react";
import HintDialog from "@/components/common/Hint-Dialog-new/Dialog";
import { useCreateHintValue } from "@/components/atoms/createHint.atom";
import { useSelectedHintValue } from "@/components/atoms/selectedHint.atom";
import { useSelectedThemeValue } from "@/components/atoms/selectedTheme.atom";
import useHintUpload from "@/queries/getPreSignedUrl";
import useModal from "@/hooks/useModal";

interface ThemeDrawerProps {
  onClose: () => void;
}

const ThemeDrawer = forwardRef(
  ({ onClose }: ThemeDrawerProps, ref: ForwardedRef<HTMLFormElement>) => {
    // 이미지 Props
    const XImageProps = {
      src: "/images/svg/icon_X.svg",
      alt: "x_button",
      width: 28,
      height: 28,
    };

    const HintImageProps = {
      src: "/images/svg/hint.svg",
      alt: "hint_help_image",
      width: 177,
      height: 127,
    };

    const GalleryImageProps = {
      src: "/images/svg/icon_gallery_white.svg",
      alt: "gallery_image",
      width: 11,
      height: 11,
    };
    const selectedHint = useSelectedHintValue();
    const selectedTheme = useSelectedThemeValue();

    // State & Refs
    const createHint = useCreateHintValue();
    const contentsRef = useRef<HTMLTextAreaElement>(null);
    const answerRef = useRef<HTMLTextAreaElement>(null);
    const [hintImages, setHintImages] = useState<File[]>([]);
    const [answerImages, setAnswerImages] = useState<File[]>([]);
    const { handleProcess } = useHintUpload();

    const progressValidations = (value: unknown) => {
      const strValue = value as string;
      const numValue = Number(strValue);
      if (
        Number.isNaN(numValue) ||
        strValue.includes(".") ||
        strValue.includes("e")
      ) {
        return "숫자로 입력해 주세요. (분 단위)";
      }
      if (strValue.length > 0 && numValue <= 0) {
        return "1 이상 입력해 주세요.";
      }
      if (numValue > 100) {
        return "100 이하로 입력해 주세요.";
      }
      return "";
    };

    const codeValidations = (value: unknown) => {
      const strValue = value as string;
      const numValue = Number(strValue);
      if (
        Number.isNaN(numValue) ||
        strValue.includes(".") ||
        strValue.includes("e")
      ) {
        return "숫자로 입력해 주세요. (분 단위)";
      }
      if (numValue > 10000) {
        return "4자리 입력해주세요.";
      }
      return "";
    };
    // TextField Props
    const codeTextFieldProps: ThemeInfoTextFieldType = {
      id: "hintCode",
      tabIndex: 1,
      title: "힌트 코드(숫자 4자리)",
      content: "",
      infoText: "",
      inputType: "text",
      inputPlaceholder: "",
      checkErrorText: codeValidations,
    };

    const rateTextFieldProps: ThemeInfoTextFieldType = {
      id: "progress",
      tabIndex: 1,
      title: "문제 진행률(%)",
      content: "",
      infoText: "",
      inputType: "text",
      inputPlaceholder: "",
      checkErrorText: progressValidations,
    };

    // 이미지 파일 핸들러
    const handleHintFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      setHintImages(files);
    };

    const handleAnswerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      setAnswerImages(files);
    };

    const hintInputRef = useRef<HTMLInputElement>(null);
    const answerInputRef = useRef<HTMLInputElement>(null);

    const handleHintClick = () => {
      hintInputRef.current?.click(); // 숨겨진 input 클릭 트리거
    };
    const handleAnswerClick = () => {
      answerInputRef.current?.click(); // 숨겨진 input 클릭 트리거
    };
    // Submit 핸들러
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      if (!contentsRef.current || !answerRef.current) return;
      if (!createHint.hintCode || !createHint.progress) {
        alert("힌트 코드와 진행률을 입력해주세요.");
        return;
      }

      const formData = {
        themeId: selectedTheme.id, // 실제 테마 ID
        hintCode: createHint.hintCode,
        contents: contentsRef.current.value,
        answer: answerRef.current.value,
        progress: Number(createHint.progress),
        id: selectedHint.id,
      };
      try {
        await handleProcess(formData, hintImages, answerImages);
      } catch (error) {
        console.error(error);
      }
      onClose();
    };
    const { open } = useModal();

    const deleteHintBtn = () => {
      // const { id } = selectedHint;
      // deleteHint({ id });
      open(HintDialog, { type: "delete", fn: onClose });
    };

    return (
      <form
        className="theme-drawer__container"
        onSubmit={handleSubmit}
        ref={ref}
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

              // content={selectedHint.progress.toString()}
            />
          </div>

          <div className="drawer-hint">
            <div className="drawer-category-title">
              힌트
              <button
                className="secondary_button28"
                type="button"
                onClick={handleHintClick}
              >
                <Image {...GalleryImageProps} />
                <input
                  type="file"
                  multiple
                  onChange={handleHintFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={hintInputRef}
                />
                이미지 추가
                {(hintImages.length > 0 ||
                  selectedHint?.hintImageUrlList?.length > 0) &&
                  `(${
                    (hintImages.length || 0) +
                    (selectedHint.hintImageUrlList?.length || 0)
                  }) `}
              </button>
            </div>
            {selectedHint?.hintImageUrlList?.map((src) => (
              <div className="drawer-images">
                <div key={src} className="drawer-image-box">
                  <img
                    src={src}
                    alt={`hint-preview-${src}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            ))}
            {hintImages.length > 0 && (
              <div className="drawer-images">
                {hintImages.map((file, index) => (
                  <div key={file.name} className="drawer-image-box">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`hint-preview-${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            <textarea
              className="drawer-content-textarea"
              ref={contentsRef}
              placeholder="힌트 내용을 입력해 주세요."
              defaultValue={selectedHint.contents}
            />
          </div>

          <div className="drawer-answer">
            <div className="drawer-category-title">
              정답
              <button
                className="secondary_button28"
                type="button"
                onClick={handleAnswerClick}
              >
                <Image {...GalleryImageProps} />
                <input
                  type="file"
                  multiple
                  onChange={handleAnswerFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={answerInputRef}
                />
                이미지 추가
                {(answerImages.length > 0 ||
                  selectedHint?.answerImageUrlList?.length > 0) &&
                  `(${
                    (answerImages.length || 0) +
                    (selectedHint.answerImageUrlList?.length || 0)
                  }) `}
              </button>
            </div>
            {selectedHint?.answerImageUrlList?.map((src) => (
              <div className="drawer-images">
                <div key={src} className="drawer-image-box">
                  <img
                    src={src}
                    alt={`answer-preview-${src}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            ))}
            {answerImages.length > 0 && (
              <div className="drawer-images">
                {answerImages.map((file, index) => (
                  <div key={file.name} className="drawer-image-box">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`answer-preview-${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            <textarea
              ref={answerRef}
              className="drawer-content-textarea"
              placeholder="정답 내용을 입력해 주세요."
              defaultValue={selectedHint.answer}
            />
          </div>
        </div>

        <div className="theme-drawer__footer">
          <button
            className="button40"
            type="button"
            onClick={deleteHintBtn}
            disabled={!selectedHint.id}
          >
            삭제하기
          </button>
          <button className="secondary_button40" type="submit">
            추가하기
          </button>
        </div>
      </form>
    );
  }
);

export default ThemeDrawer;

import { useSelectedHint } from "@/components/atoms/selectedHint.atom";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";
import { GalleryImageProps } from "./themeDrawer";

const ThemeDrawerAnswer = ({
  answerImages,
  setAnswerImages,
}: {
  answerImages: File[];
  setAnswerImages: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  const [selectedHint, setSelectedHint] = useSelectedHint();

  // 이미지 파일 핸들러
  const handleAnswerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAnswerImages(files);
  };

  const answerInputRef = useRef<HTMLInputElement>(null);

  const handleAnswerClick = () => {
    answerInputRef.current?.click(); // 숨겨진 input 클릭 트리거
  };

  const handleAnswerChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedHint((prev) => ({ ...prev, answer: e.target.value }));
  };

  // 힌트 추가 중 삭제 (로컬 이미지)
  const deleteLocalAnswerImg = (index: number) => {
    const newImages = [
      ...answerImages.slice(0, index),
      ...answerImages.slice(index + 1),
    ];
    setAnswerImages(newImages);
    if (answerInputRef.current) {
      answerInputRef.current.value = "";
    }
  };
  // 수정 시 삭제
  const deleteServerAnswerImg = (index: number) => {
    const answerServerImages = selectedHint.answerImageUrlList;
    const newImages = [
      ...answerServerImages.slice(0, index),
      ...answerServerImages.slice(index + 1),
    ];
    setSelectedHint((prev) => ({ ...prev, answerImageUrlList: newImages }));
    if (answerInputRef.current) {
      answerInputRef.current.value = "";
    }
  };

  return (
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
      {selectedHint?.answerImageUrlList?.map((src, idx) => (
        <div className="drawer-images" key={src}>
          <div className="drawer-image-box">
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
          <div
            className="drawer-image-dimmed"
            onClick={() => deleteServerAnswerImg(idx)}
          >
            <button className="button28" type="button">
              삭제하기
            </button>
          </div>
        </div>
      ))}
      {answerImages.length > 0 && (
        <div className="drawer-images">
          {answerImages.map((file, index) => (
            <>
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
              <div
                className="drawer-image-dimmed"
                onClick={() => deleteLocalAnswerImg(index)}
              >
                <button className="button28" type="button">
                  삭제하기
                </button>
              </div>
            </>
          ))}
        </div>
      )}

      <textarea
        className="drawer-content-textarea"
        placeholder="정답 내용을 입력해 주세요."
        onChange={handleAnswerChange}
        defaultValue={selectedHint.answer}
      />
    </div>
  );
};
export default ThemeDrawerAnswer;

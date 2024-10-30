import { useSelectedHint } from "@/components/atoms/selectedHint.atom";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";
import { GalleryImageProps } from "./themeDrawer";

const ThemeDrawerHint = ({
  hintImages,
  setHintImages,
}: {
  hintImages: File[];
  setHintImages: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  const [selectedHint, setSelectedHint] = useSelectedHint();

  // 이미지 파일 핸들러
  const handleHintFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log(files, "files");
    setHintImages(files);
  };

  const hintInputRef = useRef<HTMLInputElement>(null);

  const handleHintClick = () => {
    hintInputRef.current?.click(); // 숨겨진 input 클릭 트리거
  };

  const handleHintChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedHint((prev) => ({ ...prev, contents: e.target.value }));
  };

  // 힌트 추가 중 삭제 (로컬 이미지)
  const deleteLocalHintImg = (index: number) => {
    const newImages = [
      ...hintImages.slice(0, index),
      ...hintImages.slice(index + 1),
    ];
    setHintImages(newImages);
    if (hintInputRef.current) {
      hintInputRef.current.value = "";
    }
  };
  // 수정 시 삭제
  const deleteServerHintImg = (index: number) => {
    const hintServerImages = selectedHint.hintImageUrlList;
    const newImages = [
      ...hintServerImages.slice(0, index),
      ...hintServerImages.slice(index + 1),
    ];
    setSelectedHint((prev) => ({ ...prev, hintImageUrlList: newImages }));
    if (hintInputRef.current) {
      hintInputRef.current.value = "";
    }
  };

  return (
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
      {selectedHint?.hintImageUrlList?.map((src, idx) => (
        <div className="drawer-images" key={src}>
          <div className="drawer-image-box">
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
          <div
            className="drawer-image-dimmed"
            onClick={() => deleteServerHintImg(idx)}
          >
            <button className="button28" type="button">
              삭제하기
            </button>
          </div>
        </div>
      ))}
      {hintImages.length > 0 && (
        <div className="drawer-images" key="a">
          {hintImages.map((file, index) => (
            <>
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
              <div
                className="drawer-image-dimmed"
                onClick={() => deleteLocalHintImg(index)}
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
        placeholder="힌트 내용을 입력해 주세요."
        onChange={handleHintChange}
        defaultValue={selectedHint.contents}
      />
    </div>
  );
};
export default ThemeDrawerHint;

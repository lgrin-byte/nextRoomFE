import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import { useSelectedHint } from "@/components/atoms/selectedHint.atom";

import { GalleryImageProps } from "./consts/themeDrawerProps";
import useImages from "./hooks/useImages";

const ThemeDrawerHint = ({
  imageType,
  images,
  setImages,
}: {
  imageType: string;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}) => {
  const [selectedHint] = useSelectedHint();
  const {
    handleFileInputClick,
    handleFileInputChange,
    handleAddImageBtnClick,
    deleteLocalImage,
    deleteServerImage,
    hintInputRef,
  } = useImages({ imageType, images, setImages });

  return (
    <div className="drawer-hint">
      <div className="drawer-category-title">
        힌트
        <button
          className="secondary_button28"
          type="button"
          onClick={handleAddImageBtnClick}
        >
          <Image {...GalleryImageProps} />
          <input
            type="file"
            multiple
            onClick={handleFileInputClick}
            onChange={handleFileInputChange}
            accept="image/*"
            style={{ display: "none" }}
            ref={hintInputRef}
          />
          이미지 추가
          {(images.length > 0 || selectedHint?.hintImageUrlList?.length > 0) &&
            `(${
              (images.length || 0) +
              (selectedHint.hintImageUrlList?.length || 0)
            }/3)`}
        </button>
      </div>
      {selectedHint?.hintImageUrlList?.map((src, idx) => (
        <div className="drawer-images" key={src}>
          <div className="drawer-image-box">
            <img src={src} alt={`hint-preview-${src}`} />
            <div
              className="drawer-image-dimmed"
              onClick={() => deleteServerImage(idx)}
            >
              <button className="button28" type="button">
                삭제하기
              </button>
            </div>
          </div>
        </div>
      ))}
      {images.length > 0 &&
        images.map((file, index) => (
          <div className="drawer-images" key={file.name}>
            <div className="drawer-image-box">
              <img
                src={URL.createObjectURL(file)}
                alt={`hint-preview-${index}`}
              />
              <div
                className="drawer-image-dimmed"
                onClick={() => deleteLocalImage(index)}
              >
                <button className="button28" type="button">
                  삭제하기
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default ThemeDrawerHint;

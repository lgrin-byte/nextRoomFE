import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { useCreateHint } from "@/components/atoms/createHint.atom";
import { useSelectedHint } from "@/components/atoms/selectedHint.atom";
import { useToastWrite } from "@/components/atoms/toast.atom";
import { getStatus } from "@/utils/storageUtil";
import { subscribeLinkURL } from "@/admin/(consts)/sidebar";

import { getCompressImage } from "../helpers/imageHelpers";

const useImages = ({
  imageType,
  images,
  setImages,
}: {
  imageType: string;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}) => {
  const status = getStatus();

  const [selectedHint, setSelectedHint] = useSelectedHint();
  const [, setCreateHint] = useCreateHint();
  const setToast = useToastWrite();

  const [imgCnt, setImgCnt] = useState<number>(3);
  const hintRef = useRef<string>("");
  const answerRef = useRef<string>("");

  const hintInputRef = useRef<HTMLInputElement>(null);
  const answerInputRef = useRef<HTMLInputElement>(null);

  // 가지고 있던 이미지 갯수를 빼줘서 남은 imgCnt 계산
  useEffect(() => {
    const selectedImages =
      imageType === "hint"
        ? selectedHint.hintImageUrlList
        : selectedHint.answerImageUrlList;

    if (selectedHint.hintImageUrlList) {
      setImgCnt(3 - images.length - selectedImages?.length);
      return;
    }
    setImgCnt(3 - images.length);
  }, [imageType, images, selectedHint]);

  // 이미지 파일 핸들러
  const handleFileInputClick = (e: MouseEvent<HTMLInputElement>) => {
    if (imgCnt === 0) {
      e.preventDefault();
      setToast({
        isOpen: true,
        title: "이미지는 3개까지 추가할 수 있습니다.",
        text: "",
      });
      return;
    }
  };
  const fileReset = () => {
    if (imageType === "hint" && hintInputRef.current) {
      hintInputRef.current.value = "";
    }
    if (imageType === "answer" && answerInputRef.current) {
      answerInputRef.current.value = "";
    }
  };
  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const files: File[] = [];
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      const options = {
        maxSizeMB: 5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      files.push(await getCompressImage(file, options));
    } else {
      files.push(file);
    }
    setImages((prev) => [...prev, ...files]);
    fileReset();
  };

  const handleAddImageBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!(status?.replaceAll(`"`, "") === "SUBSCRIPTION")) {
      e.preventDefault();
      window.open(subscribeLinkURL, "_blank", "noopener,noreferrer");
      return;
    }
    // 숨겨진 input 클릭 트리거
    if (imageType === "hint") {
      hintInputRef.current?.click();
    } else {
      answerInputRef.current?.click();
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (imageType === "hint") {
      hintRef.current = e.target.value;
      setCreateHint((prev) => ({
        ...prev,
        contents: hintRef.current,
      }));
    } else {
      answerRef.current = e.target.value;
      setCreateHint((prev) => ({
        ...prev,
        answer: answerRef.current,
      }));
    }
  };

  // 로컬 이미지 삭제
  const deleteLocalImage = (index: number) => {
    const newImages = [...images.slice(0, index), ...images.slice(index + 1)];
    setImages(newImages);
  };
  // 서버 이미지 삭제
  const deleteServerImage = (index: number) => {
    const selectedImages =
      imageType === "hint"
        ? selectedHint.hintImageUrlList
        : selectedHint.answerImageUrlList;
    const serverImages = selectedImages;
    const newImages = [
      ...serverImages.slice(0, index),
      ...serverImages.slice(index + 1),
    ];
    setSelectedHint((prev) => {
      if (imageType === "hint") {
        return { ...prev, hintImageUrlList: newImages };
      }
      return { ...prev, answerImageUrlList: newImages };
    });
  };

  return {
    handleFileInputClick,
    handleFileInputChange,
    handleAddImageBtnClick,
    handleTextAreaChange,
    deleteLocalImage,
    deleteServerImage,
    hintInputRef,
    answerInputRef,
  };
};

export default useImages;

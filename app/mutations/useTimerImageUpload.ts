import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/reactQueryProvider";
import { useToastInfo } from "@/components/atoms/toast.atom";
import { QUERY_KEY } from "@/queries/getHintList";
import extractFilename from "@/utils/helper";

interface PreSignedUrlRequest {
  themeId: number;
}

interface PreSignedUrlResponse {
  code: number;
  message: string;
  data: {
    themeId: number;
    imageUrl: string;
  };
}

interface UploadParams {
  url: string;
  file: File;
}

interface AxiosSameCodeError {
  code: number;
  message: string;
}

interface TimerImageData {
  themeId: number;
  timerImageFile?: File;
  imageUrl?: string;
}

const getPreSignedUrl = async (
  params: PreSignedUrlRequest
): Promise<PreSignedUrlResponse> => {
  const { data } = await apiClient.get(`/v1/theme/timer/url/${params.themeId}`);
  return data;
};

const uploadToS3 = async ({ url, file }: UploadParams): Promise<void> => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "image/png",
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error(`Upload failed with status: ${response.status}`);
  }
};

const postTimerImage = (data: TimerImageData) =>
  apiClient.post("/v1/theme/timer", data);

const useTimerImageUpload = () => {
  const [, setToast] = useToastInfo();
  const queryClient = useQueryClient();
  const presignedMutation = useMutation<
    PreSignedUrlResponse,
    AxiosError<AxiosSameCodeError>,
    PreSignedUrlRequest
  >({
    mutationFn: async (params) => {
      return getPreSignedUrl(params);
    },
    onError: (error) => {
      setToast({
        isOpen: true,
        title: error.message,
        text: "presigned request fail",
      });
    },
  });

  const uploadMutation = useMutation<void, Error, UploadParams>({
    mutationFn: uploadToS3,
    onError: (error) => {
      setToast({
        isOpen: true,
        title: error.message,
        text: "",
      });
    },
  });

  const timerImageMutation = useMutation<
    AxiosResponse,
    AxiosError<AxiosSameCodeError>,
    TimerImageData
  >({
    mutationFn: (data) => postTimerImage(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERY_KEY);
      setToast({
        isOpen: true,
        title: "타이머 배경을 등록했습니다.",
        text: "힌트폰에서 세부 조정할 수 있습니다.",
      });
    },
    onError: (error) => {
      if (error.response) {
        setToast({
          isOpen: true,
          title: error.response.data.message,
          text: "",
        });
        throw new Error(error.response.data.message);
      }
    },
  });

  const handleProcess = async ({ themeId, timerImageFile }: TimerImageData) => {
    try {
      const presignedResponse = await presignedMutation.mutateAsync({
        themeId,
      });

      const { imageUrl } = presignedResponse.data;
      if (imageUrl) {
        await uploadMutation.mutateAsync({
          url: imageUrl,
          file: timerImageFile!,
        });
      }

      const data: TimerImageData = {
        themeId: themeId,
        imageUrl: extractFilename(imageUrl),
      };

      await timerImageMutation.mutateAsync(data);

      const checkFileExists = async (url: string) => {
        try {
          const response = await fetch(url, { method: "HEAD" });
          return response.ok;
        } catch (error) {
          console.error("파일 확인 실패", error);
          return false;
        }
      };

      let retries = 2;
      let fileExists = false;

      while (retries > 0 && !fileExists) {
        fileExists = await checkFileExists(imageUrl);
        if (!fileExists) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        retries--;
      }

      if (fileExists) {
        console.error("이미지 업로드 및 조회 성공");
      } else {
        console.error("이미지 업로드 되었으나 조회 실패");
      }
      return imageUrl;
    } catch (error) {
      if (error instanceof Error) {
        setToast({
          isOpen: true,
          title: error.message,
          text: "",
        });
      }
      throw error;
    }
  };

  return {
    handleProcess,
  };
};

export default useTimerImageUpload;

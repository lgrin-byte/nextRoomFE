import axios from "axios";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";

import {
  getLoginInfo,
  removeAccessToken,
  setLocalStorage,
} from "@/utils/localStorage";

interface ReissueRequest {
  accessToken: string;
  refreshToken: string;
}

interface ReissueResponse {
  accessToken: string;
  refreshToken: string;
}

const reissueToken = async ({
  accessToken,
  refreshToken,
}: ReissueRequest): Promise<ReissueResponse> => {
  try {
    const response = await axios.post<ReissueResponse>(
      "/api/v1/auth/reissue",
      {
        accessToken: accessToken.replace(/^"|"$/g, ""),
        refreshToken: refreshToken.replace(/^"|"$/g, ""),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Token reissue failed:", error);
    throw error;
  }
};

export const useTokenRefresh = () => {
  const mutation = useMutation({
    mutationFn: reissueToken,
    onSuccess: (data) => {
      setLocalStorage("accessToken", data.accessToken);
      setLocalStorage(
        "accessTokenExpiresIn",
        moment().add(3, "minutes").unix()
      );
    },
    onError: (error) => {
      removeAccessToken();
    },
  });

  // 토큰 만료 체크 및 갱신
  const checkAndRefreshToken = async () => {
    const { accessToken, refreshToken, accessTokenExpiresIn } = getLoginInfo();
    const now = new Date();

    if (!accessTokenExpiresIn) return null;

    if (Number(accessTokenExpiresIn) - now.getTime() < 0) {
      return mutation.mutateAsync({ accessToken, refreshToken });
    }

    return null;
  };

  return {
    refreshToken: checkAndRefreshToken,
    error: mutation.error,
  };
};

export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    async (config) => {
      const { accessToken, refreshToken, accessTokenExpiresIn } =
        getLoginInfo();
      const now = new Date();

      if (Number(accessTokenExpiresIn) - now.getTime() < 0) {
        try {
          const response = await reissueToken({ accessToken, refreshToken });
          config.headers.Authorization = `Bearer ${accessToken}`;
        } catch (error) {
          console.error("Token refresh failed in interceptor:", error);
        }
      } else if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

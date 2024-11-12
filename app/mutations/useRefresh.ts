import axios from "axios";
import moment from "moment";

import { useMutation } from "@tanstack/react-query";
import {
  getLoginInfo,
  removeAccessToken,
  setLocalStorage,
} from "@/utils/localStorage";

interface ReissueResponse {
  accessToken: string;
}

const reissueToken = async (): Promise<ReissueResponse> => {
  const response = await axios.post("/api/v1/auth/reissue");
  return response.data;
};

export const useTokenRefresh = () => {
  const mutation = useMutation({
    mutationFn: reissueToken,
    onSuccess: (data) => {
      setLocalStorage("accessToken", data.accessToken);
      setLocalStorage("accessTokenExpiresIn", moment().add(3, "minute"));
    },
    onError: (error) => {
      removeAccessToken();
    },
  });

  // 토큰 만료 체크 및 갱신
  const checkAndRefreshToken = async () => {
    const { accessTokenExpiresIn } = getLoginInfo();
    const now = new Date();

    if (!accessTokenExpiresIn) return null;

    if (Number(accessTokenExpiresIn) - now.getTime() < 0) {
      return mutation.mutateAsync();
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
      const { accessToken, accessTokenExpiresIn } = getLoginInfo();
      const now = new Date();

      if (Number(accessTokenExpiresIn) - now.getTime() < 0) {
        try {
          const response = await reissueToken();
          config.headers.Authorization = `Bearer ${response.accessToken}`;
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

import {
  getLoginInfo,
  removeAccessToken,
  setLocalStorage,
} from "@/utils/localStorage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";

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
    const expireAt = sessionStorage.getItem("accessTokenExpiresIn");
    const email = sessionStorage.getItem("email");

    if (!expireAt || !email) return null;

    if (moment(expireAt).diff(moment()) < 0) {
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
      const { accessToken, accessTokenExpiresIn: expireAt } = getLoginInfo();
      const now = new Date();

      if (expireAt && Number(expireAt) - now.getTime() < 0) {
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

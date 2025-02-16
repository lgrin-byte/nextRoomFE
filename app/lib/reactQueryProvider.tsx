"use client";

import { PropsWithChildren, useState } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  getLoginInfo,
  removeLocalStorageAll,
  setLoginInfo,
} from "@/utils/storageUtil";

// Axios 클라이언트 설정
export const apiClient = axios.create({
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

// 대기 중인 요청 처리
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = getLoginInfo();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken.replace(
        /^"(.*)"$/,
        "$1"
      )}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    const originalRequest = error.config;

    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const loginInfo = getLoginInfo();
          const { refreshToken, accessToken } = loginInfo;

          if (!refreshToken || accessToken === "undefined") {
            throw new Error("리프레시 토큰이 없습니다.");
          }

          const { data } = await axios.post(
            "/v1/auth/reissue",
            {
              refreshToken: refreshToken.replace(/^"(.*)"$/, "$1"),
              accessToken: accessToken.replace(/^"(.*)"$/, "$1"),
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const { data: response } = data;

          setLoginInfo({
            ...loginInfo,
            refreshToken: response.refreshToken,
            accessToken: response.accessToken,
          });
          apiClient.defaults.headers.Authorization = `Bearer ${response.accessToken}`;

          processQueue(null, response.accessToken);
          return apiClient(originalRequest);
        } catch (refreshError) {
          if (typeof window !== "undefined") {
            const currentPath = window.location.pathname;
            if (currentPath !== "/signup") {
              processQueue(refreshError, null);
              removeLocalStorageAll();
              window.location.href = "/login";
            }
          }

          throw refreshError;
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          },
          reject: (err: any) => reject(err),
        });
      });
    }

    return Promise.reject(error);
  }
);

export default function ReactQueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

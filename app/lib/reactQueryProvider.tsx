"use client";

import axios from "axios";
import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getLoginInfo, removeLocalStorageAll } from "@/utils/localStorage";
import { useIsLoggedInWrite } from "@/components/atoms/account.atom";
import { useSnackBarWrite } from "@/components/atoms/snackBar.atom";

export const apiClient = axios.create({
  withCredentials: true,
});

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

type ErrorResponse = {
  response: {
    data: {
      code: number;
      message: string;
    };
    status: number;
  };
};

export default function ReactQueryProvider({ children }: PropsWithChildren) {
  const setIsLoggedIn = useIsLoggedInWrite();
  const setSnackBar = useSnackBarWrite();

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error as ErrorResponse;
      if (response?.data?.message) {
        setSnackBar({
          isOpen: true,
          message: `${(error as any)?.response?.data?.message || error}`,
        });
      }

      if (response && response.status === 401) {
        delete apiClient.defaults.headers.Authorization;
        delete apiClient.defaults.headers.common.Authorization;
        removeLocalStorageAll();
        setIsLoggedIn(false);
      }

      return Promise.reject(error);
    }
  );

  const [queryClient] = useState(new QueryClient({}));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

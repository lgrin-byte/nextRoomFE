import {
  MutationObserverOptions,
  QueryObserverOptions,
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

export interface MutationConfigOptions {
  config?: AxiosRequestConfig;
  options?: Omit<MutationObserverOptions<any, any, any, any>, `initialData`>;
}

export interface QueryConfigOptions {
  config?: AxiosRequestConfig;
  options?: Omit<QueryObserverOptions<any, any, any, any>, `initialData`>;
}

export interface ApiResponse<T> {
  preSignedUrl: string;
  code: number;
  message: string;
  data: T;
}

export interface ApiError {
  code: number;
  message: string;
}

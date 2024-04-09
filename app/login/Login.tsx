"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/consts/components/login";

import { useIsLoggedInValue } from "@/components/atoms/account.atom";
import { usePostLogin } from "@/mutations/postLogin";
import useCheckSignIn from "@/hooks/useCheckSignIn";
import Loader from "@/components/Loader/Loader";
import LoginView from "./LoginView";

interface FormValues {
  email: string;
  password: string;
}

function Login() {
  const isLoggedIn = useIsLoggedInValue();
  const {
    mutateAsync: postLogin,
    isLoading = false,
    isError = false,
    error,
  } = usePostLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || "",
      password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "",
    },
  });

  useCheckSignIn();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    postLogin(data);
  };
  const formProps = {
    component: "form",
    noValidate: true,
    autoComplete: "off",
    onSubmit: handleSubmit(onSubmit),
    flexDirection: "column",
  };

  const adminCodeProps = {
    id: "filled-adminCode",
    type: "text",
    helperText: errors?.email && errors?.email.message,
    error: Boolean(errors?.email) || isError,
    variant: "filled",
    label: ADMIN_EMAIL,
    placeholder: ADMIN_EMAIL,
    ...register("email", { required: "이메일을 입력해 주세요." }),
    sx: {
      marginBottom: "40px",
      backgroundColor: "#FFFFFF10",
    },
  };

  const passwordProps = {
    id: "filled-password",
    type: "password",
    variant: "filled",
    label: ADMIN_PASSWORD,
    placeholder: ADMIN_PASSWORD,
    ...register("password", { required: "비밀번호를 입력해 주세요." }),
    helperText: errors?.password && errors.password.message,
    error: Boolean(errors?.password) || isError,
    sx: { backgroundColor: "#ffffff10" },
  };

  const buttonProps = {
    type: "submit",
    variant: "contained",
  };

  const logoProps = {
    src: "/images/svg/logo.svg",
    alt: "NEXT ROOM",
    width: 184,
    height: 26,
  };

  const errorMessage = isError && error?.response?.data?.message;

  const LoginViewProps = {
    formProps,
    adminCodeProps,
    passwordProps,
    buttonProps,
    logoProps,
    isLoading,
    errorMessage,
  };

  if (isLoggedIn) {
    return <Loader />;
  }

  return <LoginView {...LoginViewProps} />;
}

export default Login;

"use client";

import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { usePostTheme } from "@/mutations/postTheme";
import { usePutTheme } from "@/mutations/putTheme";
import { useSelectedTheme } from "@/components/atoms/selectedTheme.atom";
import { useModalState } from "@/components/atoms/modalState.atom";
import { useGetThemeList } from "@/queries/getThemeList";
import useChannelTalk from "@/hooks/useChannelTalk";

import Dialog from "../common/Dialog/Dialog";

import MakeThemeModalView from "./MakeThemePageView";

interface FormValues {
  id: number | undefined;
  title: string;
  timeLimit: number;
  hintLimit: number;
}

function MakeThemePage() {
  const [modalState, setModalState] = useModalState();
  const { data: categories = [] } = useGetThemeList();
  const [open, setOpen] = useState<boolean>(false);
  useChannelTalk();

  const [selectedTheme, setSelectedTheme] = useSelectedTheme();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
    trigger,
  } = useForm<FormValues>();

  const formValue = watch();
  const handleClose = () => {
    setSelectedTheme(categories[categories.length - 1]);
    if (
      modalState.type === "post" &&
      !(formValue.title || formValue.timeLimit || formValue.hintLimit)
    ) {
      setModalState({ ...modalState, isOpen: false });
    } else {
      setOpen(!open);
    }
  };
  useEffect(() => {
    reset();
    if (modalState.type === "put") {
      setValue("title", selectedTheme.title);
      setValue("timeLimit", selectedTheme.timeLimit);
      setValue("hintLimit", selectedTheme.hintLimit);
    }
  }, [selectedTheme, setValue, modalState.type, reset]);

  useEffect(() => {
    if (formValue.title && formValue.timeLimit && formValue.hintLimit) {
      trigger();
    }
  }, [formValue.hintLimit, formValue.timeLimit, formValue.title, trigger]);

  const { mutateAsync: postTheme } = usePostTheme();
  const { mutateAsync: putTheme } = usePutTheme();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const submitData = {
      id: selectedTheme.id,
      title: data.title,
      timeLimit: data.timeLimit,
      hintLimit: data.hintLimit,
    };

    if (modalState.type === "put") {
      putTheme(submitData);
      setModalState({ ...modalState, isOpen: false });
      router.push(`/admin?themeId=${encodeURIComponent(selectedTheme.id)}`);
    } else {
      postTheme(data);
      setModalState({ ...modalState, isOpen: false });
      if (data.id) {
        router.push(`/admin?themeId=${encodeURIComponent(data.id)}`);
      }
    }
  };

  const formProps = {
    component: "form",
    noValidate: true,
    autoComplete: "off",
    onSubmit: handleSubmit(onSubmit),
  };

  const themeNameProps = {
    id: "title",
    label: "테마 이름",
    placeholder: "입력해 주세요.",
    message: "손님에게는 보이지 않아요.",
    ...register("title", {
      required: "테마 이름은 필수값입니다",
      pattern: {
        value: /^.+$/,
        message: "테마 이름은 필수값입니다",
      },
    }),
  };
  const timeLimitProps = {
    id: "timeLimit",
    label: "시간",
    placeholder: "선택하기",
    type: "number",
    message: "손님이 사용할 타이머에 표시됩니다. (분 단위로 입력해 주세요.)",
    ...register("timeLimit", {
      required: "시간을 입력해주세요.",
      pattern: {
        value: /^[1-9]\d*$/,
        message: "1분 이상으로 입력해 주세요.",
      },
    }),
  };

  const hintLimitProps = {
    id: "hintLimit",
    label: "힌트 개수",
    type: "number",
    message: "이 테마에서 사용할 수 있는 힌트 수를 입력해 주세요.",
    ...register("hintLimit", {
      required: "힌트 수를 입력해 주세요.",
      pattern: {
        value: /^[1-9]\d*$/,
        message: "1개 이상으로 입력해 주세요.",
      },
    }),
  };

  const MakeThemeModalViewProps = {
    handleClose,
    formValue,
    selectedTheme,
    modalState,
    formProps,
    themeNameProps,
    timeLimitProps,
    hintLimitProps,
    titleError: errors.title,
    timeLimitError: errors.timeLimit,
    hintLimitError: errors.hintLimit,
  };

  return (
    <>
      <MakeThemeModalView {...MakeThemeModalViewProps} />
      <Dialog
        handleBtn={() =>
          router.push(`/admin?themeId=${encodeURIComponent(selectedTheme.id)}`)
        }
        open={open}
        handleDialogClose={() => setOpen(false)}
        type={modalState.type === "post" ? "themePost" : "themePut"}
      />
    </>
  );
}

export default MakeThemePage;

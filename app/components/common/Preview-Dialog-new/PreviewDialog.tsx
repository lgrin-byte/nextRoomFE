import React, { forwardRef, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";

import { usePutTheme } from "@/mutations/putTheme";
import { useDeleteTheme } from "@/mutations/deleteTheme";
import {
  useSelectedTheme,
  useSelectedThemeReset,
} from "@/components/atoms/selectedTheme.atom";
import {
  useCreateThemeReset,
  useCreateThemeValue,
} from "@/components/atoms/createTheme.atom";
import useClickOutside from "@/hooks/useClickOutside";
import { deleteProps, xProps } from "@/admin/(consts)/sidebar";
import useModal from "@/hooks/useModal";
import DialogDeleteBody from "@/components/common/Dialog-new/Theme-Dialog/DialogDeleteBody";
import ModalPortal from "@/components/common/Dialog-new/ModalPortal";

import DialogBody from "./DialogBody";

import "@/components/common/Preview-Dialog-new/dialog.sass";

interface DialogProps {
  type?: string | "";
}

interface FormValues {
  id: number;
  title: string;
  timeLimit: number;
  hintLimit: number;
}

const PreviewDialog = forwardRef<HTMLFormElement, DialogProps>((props) => {
  const { open, close } = useModal();
  const { type = "" } = props;
  const formRef = useRef<HTMLFormElement | null>(null);

  const { handleSubmit } = useForm<FormValues>();
  const [selectedTheme, setSelectedTheme] = useSelectedTheme();
  const createTheme = useCreateThemeValue();
  const resetCreateTheme = useCreateThemeReset();
  const resetSelectedTheme = useSelectedThemeReset();
  const isDisabled =
    type === "put"
      ? (String(createTheme.title) === String(selectedTheme.title) &&
          Number(createTheme.timeLimit) === Number(selectedTheme.timeLimit) &&
          Number(createTheme.hintLimit) === Number(selectedTheme.hintLimit)) ||
        !(createTheme.title && createTheme.timeLimit && createTheme.hintLimit)
      : !(createTheme.title && createTheme.timeLimit && createTheme.hintLimit);

  const { mutateAsync: putTheme } = usePutTheme();
  const { mutateAsync: deleteTheme } = useDeleteTheme();

  const onSubmit: SubmitHandler<FormValues> = () => {
    const { id } = selectedTheme;

    const submitData = {
      ...createTheme,
      id,
    };

    if (type === "put") {
      putTheme(submitData);
      setSelectedTheme(submitData);
    } else if (type === "delete") {
      deleteTheme({ id });
      resetSelectedTheme();
    }
    close();
    resetCreateTheme();

    return close();
  };

  useClickOutside(formRef, close);

  return (
    <ModalPortal>
      <form
        className={`theme-preview-modal ${type}`}
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" type="button" onClick={close}>
          <Image {...xProps} />
        </button>
      </form>
    </ModalPortal>
  );
});

PreviewDialog.defaultProps = {
  type: "",
};

export default PreviewDialog;

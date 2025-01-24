import React, { useEffect } from "react";

import "./(style)/admin.modules.sass";
import Sidebar from "@/admin/(components)/Sidebar";
import ContentArea from "@/admin/(components)/ContentArea";
import Toast from "@/components/common/Toast/Toast";
import NotiDialog from "@/components/common/Dialog-new/Noti-Dialog-new/Dialog";
import useModal from "@/hooks/useModal";
import { getLocalStorage } from "@/utils/storageUtil";
import Loader from "@/components/Loader/Loader";

interface Theme {
  id: number;
  title: string;
  timeLimit: number;
  hintLimit: number;
}

interface Props {
  categories: Theme[];
  selectedTheme: Theme;
  isOpen: boolean;
  isLoading: boolean;
  handleClickSelected: (theme: Theme) => void;
}

function AdminView(props: Props) {
  const { isOpen, isLoading } = props;
  const { open, closeAll } = useModal();
  const isHideDialog = getLocalStorage("hideDialog");

  useEffect(() => {
    closeAll();
    if (!isHideDialog) {
      open(NotiDialog, { type: "put" });
    }
  }, []);
  if (isLoading) return <Loader />;
  return (
    <div className="main">
      <Sidebar {...props} />
      <ContentArea />
      {isOpen && <Toast />}
    </div>
  );
}

export default AdminView;

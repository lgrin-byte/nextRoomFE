import { useDeleteHint } from "@/mutations/deleteHint";

import { useIsOpenDeleteDialogState } from "../atoms/hints.atom";

import DeleteHintDialogView from "./DeleteHintDialogView";

function DeleteHintDialog() {
  const [isOpenDeleteDialogState, setIsOpenDeleteDialogState] =
    useIsOpenDeleteDialogState();
  const { isOpen, id } = isOpenDeleteDialogState;
  const { mutateAsync: deleteHint } = useDeleteHint();

  const handleClose = () => {
    setIsOpenDeleteDialogState({ isOpen: false, id: 0 });
  };

  const handleDelete = () => {
    deleteHint({ id });
    handleClose();
  };

  const DeleteHintDialogProps = {
    open: isOpen,
    handleClose,
    handleDelete,
  };

  return <DeleteHintDialogView {...DeleteHintDialogProps} />;
}

export default DeleteHintDialog;

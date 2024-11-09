import { useEffect } from "react";

const useOnBeforeUnload = (isLoading: boolean) => {
  useEffect(() => {
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!isLoading) return;
      e.preventDefault();

      return (e.returnValue = "");
    };

    window.addEventListener("beforeunload", handleWindowClose);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, []);
};

export default useOnBeforeUnload;

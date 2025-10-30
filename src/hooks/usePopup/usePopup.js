import { useState } from "react";
function usePopup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [popupView, setPopupView] = useState("");
  function ClosePopup() {
    setIsPopupOpen(false);
  }

  return {
    isPopupOpen,
    setIsPopupOpen,
    ClosePopup,
    title,
    setTitle,
    popupView,
    setPopupView,
  };
}
export default usePopup;

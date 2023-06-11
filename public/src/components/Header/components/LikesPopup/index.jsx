import { useState } from "react";
import "./likesPopup.css";

export const LikesPopup = () => {
  const [isOpenPopup, setIsopenPopup] = useState(false);

  const handleOpenPopup = () => {
    setIsopenPopup((prevState) => {
      if (prevState) {
        return false;
      }
      return true;
    });
  };

  return (
    <div
      onClick={handleOpenPopup}
      className={`like-popup ${isOpenPopup ? "open" : ""}`}
    >
      Like
    </div>
  );
};

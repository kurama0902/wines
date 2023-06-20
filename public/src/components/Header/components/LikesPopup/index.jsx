import { useState } from "react";
import { LikedModal } from "../LikedModal";
import { HeartSVG } from "../HeartSVG";

import "./likesPopup.css";

export const LikesPopup = () => {
  const [display, setDisplay] = useState('none');

  const handleOpenPopup = () => {
    setDisplay('flex');
  };

  function closeModal(e) {
    if (e.target.className !== 'liked-info-wrap') {
      setDisplay('none');
    }
  }


  return (
    <div className="liked-items-btn-wrap">
      <button className="liked-items-btn" onClick={handleOpenPopup}>
        <HeartSVG />
      </button>
      <LikedModal display={display} closeModal={closeModal} />
    </div>
  );
};

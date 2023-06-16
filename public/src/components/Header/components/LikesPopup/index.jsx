import { useState } from "react";
import { LikedModal } from "../LikedModal";

import "./likesPopup.css";

export const LikesPopup = () => {
  const [display, setDisplay] = useState('none');

  const handleOpenPopup = () => {
    setDisplay('flex');
  };

  const changeToNoneState = () => {
    setDisplay('none');
  }

  return (
    <div>
      <button className="liked-items-btn" onClick={handleOpenPopup}>
        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0123 3.57169L9.92528 2.48469C7.7774 0.336808 4.29499 0.336808 2.14711 2.48469C-0.000777125 4.63258 -0.000777006 8.11498 2.14711 10.2629L10.9859 19.1017L10.9877 19.0999L11.0141 19.1262L19.8529 10.2874C22.0008 8.13952 22.0008 4.65711 19.8529 2.50923C17.705 0.361345 14.2226 0.361345 12.0747 2.50923L11.0123 3.57169ZM10.9877 16.2715L15.924 11.3352L17.3748 9.9342L17.3762 9.93565L18.4387 8.87319C19.8055 7.50635 19.8055 5.29028 18.4387 3.92344C17.0719 2.55661 14.8558 2.55661 13.4889 3.92344L11.0134 6.39904L11.0061 6.3918L11.005 6.39287L8.51107 3.89891C7.14423 2.53207 4.92815 2.53207 3.56132 3.89891C2.19449 5.26574 2.19449 7.48182 3.56132 8.84865L6.10075 11.3881L6.10254 11.3863L10.9877 16.2715Z" fill="white" stroke="white"></path>
        </svg>
      </button>
      <LikedModal display={display} changeToNoneState={changeToNoneState}/>
    </div>
  );
};

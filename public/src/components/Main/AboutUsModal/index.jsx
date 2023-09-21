import React from "react";

import './about-us-modal.css';

export const AboutUsModal = ({flag, setFlag}) => {

    const closeModal = () => {
        setFlag(!flag)
    }

    return (
        <div className={`about-us-modal ${flag ? 'modal-visible' : 'modal-invisible'}`}>
            <div onClick={closeModal} className="close-wrap"></div>
        <div className="about-us-text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore reiciendis officia, illum expedita quas accusamus soluta aperiam iusto laudantium beatae pariatur molestiae unde numquam suscipit commodi repellat harum sint nam.
        </div>
        </div>
    )
}
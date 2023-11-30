import React, { useEffect, useRef, useState } from 'react';

import { BurgerSVG } from '../../../shared/SVG/BurgerSVG';
import { CrossSVG } from '../../../shared/SVG/CrossSVG';

import './mob-content-switcher.css'

export default function MobContentSwitcher(props) {

  const [isAnimated, setIsAnimated] = useState(null);

  return (
    <div className="user-page-switcher-wrap">
      <button animated={isAnimated} onClick={() => setIsAnimated(isAnimated ? 0 : 1)}
        className="switch-btn">
        <BurgerSVG />
        <CrossSVG />
      </button>
      <div className='up-dropdown-wrap' animated={isAnimated}>
        <div className="up-dropdown">
          <button onClick={() => props.setFlag(!props.flag)} className="my-orders-btn">{props.sectionName}</button>
        </div>
      </div>
    </div>
  );
}
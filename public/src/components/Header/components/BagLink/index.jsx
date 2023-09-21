import React from 'react';
import { Link } from "react-router-dom";

import { BagSVG } from '../../../../shared/SVG/BagSVG';
import { Counter } from '../../../../shared/components/Counter';

import './bag-link.css';

export const BagLink = ({ busketAmount }) => {
	return (
		<Link to="shopping-bag" className="bag-link">
			<BagSVG />
			{busketAmount > 0 && <Counter amount={busketAmount} />}
		</Link>
	);
};

import React from 'react';

import { BagSVG } from '../../../../shared/SVG/BagSVG';
import { Counter } from '../../../../shared/components/Counter';

import './bag-link.css';

export const BagLink = ({ busketAmount }) => {
	return (
		<a className="bag-link" href="/shopping-bag">
			<BagSVG />
			{busketAmount > 0 && <Counter amount={busketAmount} />}
		</a>
	);
};

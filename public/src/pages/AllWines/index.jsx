import React from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { GeneratePageBtns } from './components/GeneratePageBtns';
import { useGetRangedWines } from '../../shared/hooks/useGetRangedWines';

import './all-wines.css';
import { Preloader } from '../../shared/components/Counter/Preloader';

export const AllWines = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const pageNumber = Number(searchParams.get('page')) || 1;

	const winesData = useGetRangedWines(pageNumber) || {};
	const { items, pagesCount } = winesData;


	function changePageUrl(page) {
		setSearchParams(`page=${page}`);
	}

	function changeRange(number) {
		changePageUrl(number);
	}

	function changeToPreviousState() {
		if (pageNumber !== 1) {
			changePageUrl(pageNumber - 1);
		}
	}

	function changeToNextState() {
		if (pageNumber !== pagesCount) {
			const newPage = pageNumber + 1;
			changePageUrl(newPage);
		}
	}

	return (
		<div className="all-wines-wrap">
			<Preloader />
			<h1 className="wines-list-label">Wines list:</h1>
			<div className="all-wines-section">
				{items?.map((wine) => {
					return (
						<Link to={`/wine?id=${wine.id}`} key={wine.id} className="wine-wrap">
							<img className="wine-img" src={wine.imgURL} alt={wine.description} />
							<p className="wine-name">{wine.description}</p>
						</Link>
					);
				})}
			</div>
			<div className="pag-wrap">
				<div className="wines-pagination">
					<button onClick={changeToPreviousState} className="previous-btn">
						Previous
					</button>
					<div className="pagination-numbers">
						<GeneratePageBtns
							pageNumber={pageNumber}
							changeRange={changeRange}
							pagesCount={pagesCount}
						/>
					</div>
					<button onClick={changeToNextState} className="next-btn">
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

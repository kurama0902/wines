import React, { useRef } from "react";
import { useSelector } from "react-redux";

import { useSearchParams } from "react-router-dom";
import { GeneratePageBtns } from "../../AllWines/components/GeneratePageBtns";
import { Preloader } from "../../../shared/components/Counter/Preloader";
import { useGetRangedWines } from "../../../shared/hooks/useGetRangedWines";
import { LockSVG } from "../../../shared/SVG/LockSVG";

import './goods-setings.css'

export const GoodsSettings = () => {

    const { user } = useSelector((state) => ({
        user: state.auth.user,
    }));

    const [searchParams, setSearchParams] = useSearchParams();
    const inputValue = useRef({})

    const pageNumber = Number(searchParams.get('page')) || 1;

    const winesData = useGetRangedWines(pageNumber) || {};
    const { items, pagesCount, flag } = winesData[0] || [];
    const setData = winesData[1];

    console.log(items);


    function changePageUrl(page) {
        setSearchParams(`page=${page}`);
    }

    function changeRange(number) {
        changePageUrl(number);
        if (pageNumber !== number) {
            setData(undefined)
        }
    }

    function changeToPreviousState() {
        if (pageNumber !== 1) {
            changePageUrl(pageNumber - 1);
            setData(undefined)
        }
    }

    function changeToNextState() {
        if (pageNumber !== pagesCount) {
            const newPage = pageNumber + 1;
            changePageUrl(newPage);
            setData(undefined)
        }
    }

    const deleteWine = async (id) => {
        await fetch('http://localhost:3010/api/deleteWine', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id
            })
        })

        try {
            let res = await fetch('http://localhost:3010/api/getRangedWines', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ page: pageNumber }),
            });
            let wines = await res.json();
            setData(wines);
        } catch (error) {
            console.error('Error');
        }
    }

    const changeInputValue = (id, value) => {
        inputValue.current[id] = value
        console.log(inputValue.current, 'Quantity');
    }

    const updateWineQuantity = async (id) => {
        console.log(id, 'ID');
        console.log(inputValue.current[`${id}`], 'Value');
        await fetch('http://localhost:3010/api/updateWineQuantity', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                quantity: Number(inputValue.current[`${id}`])
            })
        })
    }

    return (
        <div className="wine-settings-wrap">
            {flag ? <h1 className='no-label'>No wines</h1> : <div className="wines-list">
                {items === undefined ? <Preloader /> : items?.map((e, index) => {
                    return (
                        <div className="product-wrap" key={e.id}>
                            <div className="picture-and-description">
                                <img className="wine-img" src={e.imgURL} alt="" />
                                <div className="description-info">
                                    <p className="description">{e.description}</p>
                                    <p className="year">{e.year}</p>
                                </div>
                            </div>
                            <div className="price-and-quality">
                                <div className="price-and-avalability">
                                    <div className="availability">
                                        <p>{e.avaliableAmount} bottles</p>
                                        <p className="grey-text">available</p>
                                    </div>
                                    <div className="price">
                                        <p className="cost">€{e.cost}</p>
                                        <p className="grey-text cl">/ {e.cl}cl</p>
                                    </div>
                                </div>
                                <div className="quality-and-price-state">
                                    <div className="quality">
                                        <p>{e.quality}</p>
                                        <p className="grey-text">condition</p>
                                    </div>
                                    <div className="price-state">
                                        <LockSVG />
                                        <p className="grey-text">{e.fixedPrice ? 'Fixed price' : 'Non fixed price'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="update-and-delete">
                                <button onClick={() => deleteWine(e.id)} className="delete-wine-btn">Delete wine</button>
                                <div className="update">
                                    <input onChange={(el) => changeInputValue(`${e.id}`, el.target.value)} defaultValue={e.avaliableAmount} min={1} className="quantity-input" type="number" placeholder="quanity..."  />
                                    <button onClick={() => updateWineQuantity(e.id)} className="update-btn">Update</button>
                                </div>
                            </div>
                        </div>

                    );
                })}
            </div>}
            {!flag && <div className="pag-wrap">
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
            </div>}
        </div>
    )
} 
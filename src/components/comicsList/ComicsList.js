import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useComics from '../../services/Comics';
import Spinner from '../spinner/Spinner';
import ErrorMess from '../errorMess/ErrorMess';

import './comicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [newLoading, setNewLoading] = useState(false);
    const [offset, setOffset] = useState(100);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getComicsList} = useComics();

    useEffect(()=>{
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset, initial) =>{
        initial ? setNewLoading(false) : setNewLoading(true);
        getComicsList(offset).then(onComicsLodaded);
    }

    const onComicsLodaded = (newComics) =>{
        let end = false;
        if(newComics.length < 8){
            end = true;
        }

        setComics(comics => [...comics, ...newComics]);
        setNewLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => end);
    }

    const renderElems = (arr) =>{
        const elems = arr.map((item, index) =>{
            const {title, thumbnail, id, price} = item;
            return (
                <li 
                    className="comics__item"
                    key = {index}
                    tabIndex={0}>
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt={title} className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        })

        return(
            <ul className="comics__grid">
                {elems}
            </ul>
        )
    }

    const elems = renderElems(comics);
    const errorMess = error ? <ErrorMess/> : null;
    const spinner = loading && !newLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMess}
            {spinner}
            {elems}
            <button 
                className="button button__main button__long"
                disabled={newLoading}
                onClick={() => onRequest(offset)}
                style={{display: comicsEnded ? 'none': 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
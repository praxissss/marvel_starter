import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMess from '../errorMess/ErrorMess';

import './charList.scss';

const CharList = (props) => {
    const [chars, setChars] = useState([]);
    const [newLoading, setNewLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charsEnded, setCharsEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() =>{
        onRequest(offset, true);
    // eslint-disable-next-line
    }, []);

    const onRequest = (offset, initial) =>{
        initial ? setNewLoading(false) : setNewLoading(true)
        getAllCharacters(offset).then(onCharsLoaded);
    }

    const onCharsLoaded = newChars =>{
        let end = false;
        if(newChars.length < 9){
            end = true;
        }

        setChars(chars => [...chars, ...newChars]);
        setNewLoading(newLoading => false);
        setOffset(offset => offset + 9);
        setCharsEnded(charsEnded => end);
    }

    const refArr = useRef([]);

    const activeChar = id =>{
        refArr.current.forEach(item => item.classList.remove('char__item_selected'));
        refArr.current[id].classList.add('char__item_selected');
        refArr.current[id].focus();
    }


    const renderElems = (arr) =>{
        const elems = arr.map((item, index) =>{
            const {name, thumbnail, id} = item;
            return(
                <li className="char__item" 
                    key = {id}
                    tabIndex = {0}
                    ref = {el => refArr.current[index] = el}
                    onClick = {(e) => {
                        props.onCharSelected(id);
                        activeChar(index);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            props.onCharSelected(item.id);
                            activeChar(index);
                        }
                    }}
                    >
                    <img 
                        src = {thumbnail} 
                        alt = {name} 
                        style = {thumbnail.includes('image_not_available') ? {objectFit: 'unset'} : null}/>
                    <div className = "char__name">{name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {elems}
            </ul>
        );
    }

    const elems = renderElems(chars);
    const errorMess = error ? <ErrorMess/> : null;
    const spinner = loading && !newLoading ? <Spinner/> : null;
    // const content = !(loading || error) ? elems : null;

    return (
        <div className="char__list">
            {errorMess}
            {spinner}
            {elems}
            <button 
                className="button button__main button__long"
                disabled={newLoading}
                onClick={() => onRequest(offset)}
                style={{display: charsEnded ? 'none': 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
CharList.propsType ={
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
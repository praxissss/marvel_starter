import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMess from '../errorMess/ErrorMess';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';
import './charInfo.scss';

const CharInfo = ({charId}) =>{
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() =>{
        updChar();
    // eslint-disable-next-line
    }, [charId]);

    const onCharLoaded = (char) =>{
        setChar(char);
    }

    const updChar = () =>{
        clearError();
        if(!charId){return}
        getCharacter(charId).then(onCharLoaded)
    }
    
    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMess = error ? <ErrorMess/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char ) ?  <View char={char}/> : null;


    return (
        <div className="char__info">
            {skeleton}
            {errorMess}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) =>{
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    return(
        <>
            <div className="char__basics">
                <img 
                    src={thumbnail} 
                    alt={name}
                    style = {thumbnail.includes('image_not_available') ? {objectFit: 'unset'} : null}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "This char don't reminded in any comics"}
                {
                    // eslint-disable-next-line
                    comics.map((item, index) =>{
                        if(index < 10){
                            return (
                                <li className="char__comics-item" key={index}>
                                    {item.name}
                                </li>
                            );
                        }
                    })
                }
            </ul>
        </>
    ) 
}
CharInfo.propTypes ={
    charId: PropTypes.number
}

export default CharInfo;
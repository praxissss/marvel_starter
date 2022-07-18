import {useHttp} from '../hooks/http.hook';

const useMarvelService = () =>{
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=01c205575f843e4eeb33b9d30e60d33a';
    // _apiKey = 'apikey=d101fbba3d6389e82117117b109f72bf';
    const _baseOffset = 210;


    // getResource = async (url) =>{
    //     const res = await fetch(url);
    
    //     if(!res.ok){
    //         throw new Error(`Error${url}, status: ${res.status}`);
    //     }
    
    //     return res.json();
    // };

    const getAllCharacters = async (offset = _baseOffset) =>{
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) =>{
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) =>{
        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError};
}

export default useMarvelService;
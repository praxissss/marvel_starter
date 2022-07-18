import {useHttp} from '../hooks/http.hook';

const useComics = () =>{
    const {loading, error, request, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=01c205575f843e4eeb33b9d30e60d33a';
    const _baseOffset = 100;

    const getComicsList = async (offset = _baseOffset) =>{
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comics) =>{
        return{
            id: comics.id,
            title: comics.title,
            description: comics.description ? comics.description : 'There is no description for this comic',
            pages: comics.pageCount + ' pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices.price ? comics.prices.price + '$' : 'Not available',
            lang: comics.textObjects.language || 'en-us'
        }
    }

    return {loading, clearError, error, getComicsList, getComics}
}

export default useComics;
import img from './error.gif'

const ErrorMess = () =>{
    return(
        // <img src={process.env.PUBLIC_URL + '/error.gif'} alt="error" />
        <img src={img} alt="error" style={{display: 'block', width: 250, height: 250, objectFit: 'contain', margin: '0 auto'}}/>
    )
}

export default ErrorMess;

import ErrorMess from "../errorMess/ErrorMess"
import { Link } from "react-router-dom"

const Page404 = () =>{
    return(
        <div>
            <ErrorMess/>
            <Link to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;
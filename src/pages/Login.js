import Api from "../api/Api";
import {setCookie} from "../util/cookieUtil";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Login() {
    const api = new Api()
    const user = {
        username: '',
        password: ''
    }
    const dispatch = useDispatch();
    const toggleLogin = () => {
        dispatch({ type: 'LOGIN' })
    };
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()

        api.login(user)
            .then(response => {
                    if (response.status === 403){
                        console.log('login unsuccessful')
                    } else {
                        setCookie('access_token', response.headers['access_token'])
                        setCookie('refresh_token', response.headers['refresh_token'])
                        toggleLogin()
                        navigate('/contacts')
                    }
                },
                (error) => {
                    console.log("hjaelp")
                }
            )
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        user[name] = value
    }

    return(
        <div className="container">
            <h2>Log in</h2>
            <form method="post" onSubmit={handleSubmit}>
                <label>Username:</label><br></br>
                <input className="form-element" name="username" type="text" onChange={handleChange}/><br></br>
                <label>Password:</label><br></br>
                <input className="form-element" name="password" type="password" onChange={handleChange}/><br></br>
                <input className='button login form-element' type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login
import { Component } from "react";
import Api from "../api/Api";

class Login extends Component{
    api = new Api()

    constructor(props){
        super(props);
        this.state = {
            user: {
                username: '',
                password: ''
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const user = this.state.user
        let response

        this.api.login(user)
            .then(res => {
                response = res
                return res.json()
            })
            .then(
                (data) => {
                    if(response.status === 200){
                        if(data.token) {
                            //HELP
                        }
                    }
                },
                (error) => {
                    //HELP
                }
            )
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const  user = {...this.state.user}
        user[name] = value

        this.setState({
            user:user
        })

       // console.log(this.state.user)
    }

    render(){

        return(
            <div className="container">
                <h2>Login</h2>
                <form method="post" onSubmit={this.handleSubmit}>
                    <label>Username:</label>
                    <input name="username" type="text" onChange={this.handleChange}/>
                    <label>Password:</label>
                    <input name="password" type="password" onChange={this.handleChange}/>
                    <input className='button confirm form-element' type="submit" value="Login" />
                </form>
            </div>
        )
    }
}

export default Login
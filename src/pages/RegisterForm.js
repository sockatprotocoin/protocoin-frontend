import { Component } from "react";
import Api from "../api/Api";

class RegisterForm extends Component {
    api = new Api()

    constructor(props){
        super(props);
        this.state = {
            user: {
                username: '',
                email: '',
                password: ''
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let user = this.state.user
        let{username,email,password} = user
        let response

        this.api.addUser(user)
            .then(res => {
                response = res
                return res.json()
            })
            .then(
                (data) => {
                    if(response.status === 200){
                        //HELP
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
                <h2>Register</h2>
                <form method="post" onSubmit={this.handleSubmit}>
                    <label>Username:</label>
                    <input name="username" type="text" onChange={this.handleChange}/>
                    <label>Email:</label>
                    <input name="email" type="text" onChange={this.handleChange}/>
                    <label>Password:</label>
                    <input name="password" type="password" onChange={this.handleChange}/>
                    <label>Confirm password:</label>
                    <input name="password2" type="password" />
                    <input className='button confirm form-element' type="submit" value="Register" />
                </form>
            </div>
        )
    }
}

export default RegisterForm
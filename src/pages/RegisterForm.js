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
            },
            registered: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let user = this.state.user
        let{username,email,password} = user

        this.api.addUser(user)
            .then(response => {
                    if(response.status === 200){
                        console.log("200")
                        this.setState({...this.state.user, registered : true})
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

        if(this.state.registered === false)
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
        else 
            return(
                <div className="container">
                    <h2>{this.state.user.username} successfully registered</h2>
                    <h3>You can now log in!</h3>
                </div>
            )

    }
}

export default RegisterForm
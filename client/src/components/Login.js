import React from "react";
import axiosWithAuth from './AxiosWithAuth';

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('api/login', this.state.credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        this.props.history.push('/protected');
      })
      .catch(err => console.log(err.response))
  }

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    })
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input 
            type="text"
            name="username"
            className="input"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.credentials.username}
          />
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.credentials.password} 
          />
          <button className="input button">Log In</button>
        </form>
      </div>
    );
  };
}

export default Login;
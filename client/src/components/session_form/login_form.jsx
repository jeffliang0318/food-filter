import React from "react";
import { withRouter } from "react-router-dom";

class loginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          style:{
            border: '1px solid #cea0a5',
            padding: '10px',
            color:' #86181d',
            backgroundColor: '#ffdce0'
          }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
      }

      update(field) {
        return e =>
          this.setState({
            [field]: e.currentTarget.value
          });
      }

      componentDidUpdate(){
        if(this.props.auth) {
            this.props.closeModal();
          }
      }


      componentWillUnmount(){
        this.props.clearErrors();

      }



    handleSubmit(e) {
        e.preventDefault();
        let userInfo = {
          username: this.state.username,
          password:this.state.password
        };
        const user = Object.assign({}, userInfo);
        this.props.loginUser(user);
      }

      renderErrors() {
        let errors = this.props.errors;
        if (errors.length !== 0) {
          return(
            <ul style = {this.state.style}>
              {errors.map((error,i) => (
                <li key = {`errors-${i}`}>
                  {error}
                </li>
              ))}
            </ul>
          );
        }
    }



    render() {

        return (
          <div className='whole-login-container'>

            <form onSubmit={this.handleSubmit} className="login-form-box">
              <div className="login-form">

                  <h1 className="login-title">Please {this.props.formType}</h1>
                  <div>
                    {this.renderErrors()}

                    <input
                      type="text"
                      value={this.state.username}
                      onChange={this.update("username")}
                      className="login-input"
                      placeholder="Username"
                      />
                  </div>
                <br />
                  <div>
                    <input
                      type="password"
                      value={this.state.password}
                      onChange={this.update("password")}
                      className="login-input"
                      placeholder="Password"
                      />
                  </div>
                <br />

                <input
                  className="session-submit"
                  type="submit"
                  value={this.props.formType}
                />
              </div>
            </form>

            <button
              className="session-submit demo-login" onClick = {
                  () => this.props.loginUser({username:'Demo', password:'password'})}>
              Demo Login
            </button>

            <a className="google-login" href="/auth/google">
                <i className="fab fa-google-plus-g"></i>
                <p>Sign in with Google+</p>
            </a>

            <div className="form-nav">
              {this.props.otherForm}

            </div>

            </div>
        );
    }

}

export default withRouter(loginForm);

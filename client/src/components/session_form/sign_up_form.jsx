import React from "react";
import { withRouter } from "react-router-dom";

class signUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          email: "",
          password: "",
          password2: ""
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
            this.props.loginUser({username: this.state.username, password: this.state.password})
          }
      }


      componentWillUnmount(){
        this.props.clearErrors();
      }

      handleSubmit(e) {
        // console.log('submit');
          e.preventDefault();
          const user = Object.assign({}, this.state);
          // console.log(this.state);

          this.props.registerUser(user);
        }

        renderErrors() {
          return(
            <ul className='error'>
              {this.props.errors.map((error,i) => (
                <li key = {`errors-${i}`}>
                  {error}
                </li>
              ))}
            </ul>
          );
      }

    render() {
        return (
          <div className='whole-login-container'>
            <form onSubmit={this.handleSubmit} className="login-form-box">
              <div className="login-form">

                  <h1 className="login-title">{this.props.formType}</h1>

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
                      type="text"
                      value={this.state.email}
                      onChange={this.update("email")}
                      className="login-input"
                      placeholder="Email"
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
                  <div>
                    <input
                      type="password"
                      value={this.state.password2}
                      onChange={this.update("password2")}
                      className="login-input"
                      placeholder="Confirm Password"
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
              className="session-submit demo-login">
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

export default withRouter(signUpForm);

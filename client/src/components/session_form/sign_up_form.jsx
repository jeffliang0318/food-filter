import React from "react";
import { withRouter } from "react-router-dom";

class signUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          preferredName: "",
          email: "",
          password: "",
          password2: "",
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
            this.props.loginUser({username: this.state.username, password: this.state.password})
          }
      }


      componentWillUnmount(){
        this.props.clearErrors();
      }

      handleSubmit(e) {
          e.preventDefault();
         const {username, email, preferredName, password, password2} = this.state;
          let userInfo = {
            username: username,
            email: email,
            preferredName: preferredName,
            password: password,
            password2: password2
          }
          const user = Object.assign({}, userInfo);

          this.props.registerUser(user);
          // this.props.history.push("/user");

          clearTimeout(this.timer);
          const that = this;
          this.timer = setTimeout(function() {
            that.props.history.push("/user");
          }, 600)
        }

        renderErrors() {

          let errors= this.props.errors;
          if (errors.length !== 0) {
          return(
            <ul style = {this.state.style}>
              {
                this.props.errors.map((error,i) => (
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
                      type="text"
                      value={this.state.preferredName}
                      onChange={this.update("preferredName")}
                      className="login-input"
                      placeholder="Preferred Name"
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

export default withRouter(signUpForm);

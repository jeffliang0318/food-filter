import { connect } from "react-redux";
import React from "react";
import { openModal, closeModal } from "../../actions/modal_actions";
import { loginUser,receiveErrors } from "../../actions/session_actions";
import { withRouter } from 'react-router-dom';
import loginForm from "./login_form";

const mapStateToProps = (state) => {
  return {
    formType: "Login",
    auth: state.auth,
    errors: state.errors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    loginUser: (user) => dispatch(loginUser(user)),
    otherForm: (
      <a className='other-button' onClick={() => dispatch(openModal("signup"))}>Need an Account? <span>Click to Register</span></a>
    ),
    clearErrors: () => dispatch(receiveErrors([])),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(loginForm));

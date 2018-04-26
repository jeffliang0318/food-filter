import { connect } from "react-redux";
import React from "react";
import { openModal, closeModal } from "../../actions/modal_actions";
import { withRouter } from 'react-router-dom';
import signUpForm from "./sign_up_form";

const mapStateToProps = (state) => {
  return {
    formType: "Register"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    otherForm: (
        <a className='other-button' onClick={() => dispatch(openModal("login"))}>Already have an account? <span>Log In</span></a>
      )
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(signUpForm));

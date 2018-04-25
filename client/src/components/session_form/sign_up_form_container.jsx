import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
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
        <button className='other-button' onClick={() => dispatch(openModal("login"))}>Already have an account? Log In</button>
      )
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(signUpForm));
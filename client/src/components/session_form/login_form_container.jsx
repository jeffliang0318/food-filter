import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import { withRouter } from 'react-router-dom';
import loginForm from "./login_form";

const mapStateToProps = (state) => {
  return {
    formType: "Login"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(loginForm));

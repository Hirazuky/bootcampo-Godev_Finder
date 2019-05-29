import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions as repoActions } from "../../store/ducks/reducers";

//Icone de fechar da listagem
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

class devList extends Component {
  render() {
    return (
      <div id="list">
        {this.props.users.repos.map(user => (
          <div className="info" key={user.id}>
            <img src={user.avatar} alt="avatar" />
            <div className="nameLogin">
              <h1 className="name">{user.name}</h1>
              <p className="username">{user.login}</p>
            </div>
            <FontAwesomeIcon
              className="close"
              icon={faTimesCircle}
              onClick={() => this.props.closeUser(user.id)}
            />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.reducers
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(repoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(devList);

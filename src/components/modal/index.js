import React, { Component } from "react";
import ReactModal from "react-modal";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions as repoActions } from "../../store/ducks/reducers";

//Mensagens de erro/sucesso
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

class ModalAddUser extends Component {
  state = {
    inputUser: ""
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data.showMessage) {
      this.showMessage();
    }
  }

  showMessage = () => {
    if (this.props.data.error === null) {
      toast.success("Usuário adicionado com sucesso!");
    } else {
      toast.error(this.props.data.error);
    }

    this.props.stopShowMessage();
  };

  handleAddUser = event => {
    event.preventDefault();

    this.props.addRepositoryRequest(
      this.state.inputUser,
      this.props.data.latClick,
      this.props.data.longClick
    );
  };

  render() {
    return (
      <ReactModal
        appElement={document.getElementById("root")}
        isOpen={this.props.data.showModal}
        style={{
          overlay: {
            backgroundColor: "rgb(153,153,153, 0.5)"
          },
          content: {
            marginTop: 250,
            marginLeft: 650,
            width: 300,
            height: 150,
            borderRadius: 10
          }
        }}
      >
        <div id="modalItens">
          <h1>Adicionar novo usuário</h1>
          <form onSubmit={e => this.handleAddUser(e)}>
            <input
              placeholder="Usuário no GitHub"
              onChange={e => this.setState({ inputUser: e.target.value })}
            />
            <div id="buttons">
              <button id="cancelar" onClick={this.props.closeModal}>
                Cancelar
              </button>
              <button type="submit" id="salvar">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </ReactModal>
    );
  }
}

const mapStateToProps = state => ({
  data: state.reducers
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(repoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAddUser);

import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions as repoActions } from "../../store/ducks/reducers";

import MapGL, { Marker } from "react-map-gl";
import ModalAddUser from "../modal/index";

import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.css";

class Map extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -19.91926,
      longitude: -43.938623,
      zoom: 14
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  };

  handleOpenModal = event => {
    const [longitude, latitude] = event.lngLat;

    this.props.openModal(latitude, longitude);
  };

  render() {
    console.log(this.props.users.repos);
    return (
      <MapGL
        {...this.state.viewport}
        onClick={event => this.handleOpenModal(event)}
        mapStyle="mapbox://styles/mapbox/basic-v9"
        mapboxApiAccessToken={
          "pk.eyJ1IjoiaGlyYXp1a3kiLCJhIjoiY2p2eW1sejl5MGhvcDRhcDh2NXB5NDV4aiJ9.ax9uzCdL5uFOio7E0r3tVA"
        }
        onViewportChange={viewport => this.setState({ viewport })}
        className="mapGL"
      >
        <ModalAddUser
          status={this.state.showModal}
          closeModal={this.handleCloseModal}
          handleAddUser={e => this.handleAddUser(e)}
        />

        {this.props.users.repos.map(user => (
          <Marker
            key={user.id}
            latitude={user.lat}
            longitude={user.long}
            onClick={this.handleMapClick}
            captureClick={true}
          >
            <img src={user.avatar} alt="avatar" />
          </Marker>
        ))}
      </MapGL>
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
)(Map);

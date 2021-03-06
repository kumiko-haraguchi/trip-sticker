import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

import './Map.css';
import star from '../../img/star.png'
import fancyMapStyles from "./fancyMapStyles.json";

const MyMap = withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom = {2}
      defaultCenter = {{lat: 33.681167, lng: 155.767052}}
      defaultOptions={{
        styles: fancyMapStyles,
        mapTypeControl: false,
        streetViewControl: false
      }}
      onClick={(e)=> {props.onMapClick(e.latLng)}}
    >
    {props.stickers.map((sticker, idx) => (
      <Marker
        key = {idx}
        position = {{lat : sticker.lat, lng: sticker.lng }}
        icon = {star}
        onClick={() => props.onMarkerClick(sticker)}
      >
      {sticker.isInfoWindowOpen
        ? <InfoWindow className="infoWindowWrapper" onCloseClick={() => props.onMarkerClose(sticker)}>
            <div className="infoWindow">
              <p className="infoWindowText"><span className="country">{'Country'}</span>{sticker.country}</p>
              <p className="infoWindowText"><span className="city">{'City'}</span>{sticker.city}</p>
              <p className="infoWindowText"><span className="note">{'Note'}</span>{sticker.note}</p>
              <p className="infoWindowText"><span className="name">{'Name'}</span>{sticker.username}</p>
              <div className="infoWindowBtnWrapper">
                <button className="deleteBtn" onClick={()=> props.onDeleteSticker(sticker)}>DELETE</button>
                <button className="editBtn" onClick={()=> props.onEditSticker(sticker)}>EDIT</button>
              </div>
            </div>
          </InfoWindow>
        : null
      }
      </Marker>
    ))}
    </GoogleMap>
  )}
);

class Map extends Component {
  componentDidMount() {
    this.props.fetchStickers();
  }

  render () {
    return (
      <MyMap
        containerElement={<div className='mapContainer' style={{ height: `100%`}}/>}
        mapElement={<div className='mapElement' style={{ height: `100%`}}/>}
        stickers={this.props.stickers}
        onMapClick={this.props.openModal}
        onMarkerClick={this.props.openInfoWindow}
        onMarkerClose={this.props.closeInfoWindow}
        onEditSticker={this.props.openModalEdit}
        onDeleteSticker={this.props.deleteSticker}
      />
    )
  }
}

Map.propTypes = {
  stickers: PropTypes.array.isRequired,
  fetchStickers: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  openInfoWindow: PropTypes.func.isRequired,
  closeInfoWindow: PropTypes.func.isRequired,
  openModalEdit: PropTypes.func.isRequired,
  deleteSticker: PropTypes.func.isRequired,
};

export default Map;
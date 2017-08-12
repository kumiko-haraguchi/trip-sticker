import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import PropTypes from 'prop-types';

import './Map.css';
import star from '../img/star.png'
import fancyMapStyles from "./fancyMapStyles.json";

const MyMap = withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom = {2}
      defaultCenter = {
        { lat: 3.681167, lng: 155.767052 }
      }
      defaultOptions={{
        styles: fancyMapStyles,
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
        { sticker.isInfoWindowOpen
          ? <InfoWindow className="infoWindowWrapper" onCloseClick={() => props.onMarkerClose(sticker)}>
            <div className="infoWindow">
              <p className="infoWindowText"><span className="country">{'Country'}</span>{sticker.country}</p>
              <p className="infoWindowText"><span className="city">{'City'}</span>{sticker.city}</p>
              <p className="infoWindowText"><span className="note">{'Note'}</span>{sticker.note}</p>
              <p className="infoWindowText"><span className="name">{'Name'}</span>{sticker.username}</p>
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
    this.props.fetchStickers()
  }

  render () {
    return (
      <MyMap
        containerElement={
          <div
            className='mapContainer'
            style={{ height: `800px`}}
          />
        }
        mapElement={
          <div
            className='mapElement'
            style={{ height: `800px`}}
          />
        }
        stickers={this.props.stickers}
        onMapClick={this.props.openModal}
        onMarkerClick={this.props.openInfoWindow}
        onMarkerClose={this.props.closeInfoWindow}
      />
    )
  }
}

Map.propTypes = {
  stickers: PropTypes.array.isRequired
};

export default Map;
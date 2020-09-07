import React, { Component } from "react"
import { Map, TileLayer } from "react-leaflet"
import "./leaflet.css"
import { showDataOnMap } from "../util"

export class Leaflet extends Component {
  render() {
    const { mapZoom, mapCenter, mapCountries, casesType } = this.props
    return (
      <div className="map">
        <Map center={mapCenter} zoom={mapZoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {showDataOnMap(mapCountries, casesType)}
        </Map>
      </div>
    )
  }
}

export default Leaflet

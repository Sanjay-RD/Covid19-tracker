import React, { Component } from "react"
import { Circle } from "react-leaflet"
import { Popup } from "react-leaflet"
import numeral from "numeral"
import "./App.css"

const CasesTypeColor = {
  cases: {
    hex: "#cc1034",
  },
  recovered: {
    hex: "#7dd71d",
  },
  deaths: {
    hex: "#fb4443",
  },
}

export const sortData = (data) => {
  const sortedData = [...data]
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1
    } else {
      return 1
    }
  })
  return sortedData
}

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      key={country.country}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.2}
      color={CasesTypeColor[casesType].hex}
      fillColor={CasesTypeColor[casesType].hex}
      radius={Math.sqrt(country[casesType]) * 800}
    >
      <Popup>
        <div className="Popup">
          <div className="country__flag">
            <img src={country.countryInfo.flag} />
          </div>
          <div className="country__name">{country.country}</div>
          <div className="country__cases">
            <strong>Cases:</strong> {numeral(country.cases).format("0,0")}
          </div>
          <div className="country__recovered">
            <strong>Recovered: </strong>
            {numeral(country.recovered).format("0,0")}
          </div>
          <div className="country__deaths">
            <strong>Deaths: </strong>
            {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ))

export const prettyPrint = (num) =>
  num ? `+${numeral(num).format("0.0a")}` : "+0"

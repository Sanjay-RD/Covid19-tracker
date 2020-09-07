import React, { Component } from "react"
import "./App.css"
import axios from "axios"
import Header from "./component/Header"
import "bootstrap/dist/css/bootstrap.min.css"
import Boxs from "./component/box/Boxs"
import Table from "./component/table/Table"
import Tables from "./component/table/Tables"
import LineGraph from "./component/table/LineGraph"
import Leaflet from "./map/Leaflet"
import "leaflet/dist/leaflet.css"
import { sortData } from "./util"

export class App extends Component {
  state = {
    getCountryList: [],
    countryCode: "worldwide",
    selectedCountry: {},
    allCountriesInfo: [],
    mapCenter: { lat: 34.80746, lng: -40.4796 },
    mapZoom: 2,
    mapCountries: [],
    casesType: "cases",
  }
  async componentDidMount() {
    const res = await axios.get("https://disease.sh/v3/covid-19/countries")
    const data = res.data
    console.log(data)
    const country = data.map((country) => ({
      name: country.country,
      countryCode: country.countryInfo.iso3,
    }))
    const worldwideData = await (
      await axios.get("https://disease.sh/v3/covid-19/all")
    ).data
    this.setState({
      getCountryList: country,
      selectedCountry: worldwideData,
      allCountriesInfo: sortData(data),
      mapCountries: data,
    })
  }

  onChange = async (e) => {
    const countriesCode = e.target.value
    // console.log(countriesCode)
    this.setState({ countryCode: countriesCode })
    const url =
      countriesCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countriesCode}`
    const res = await axios.get(url)
    // console.log(res.data)
    const countryInfo = res.data
    this.setState({
      selectedCountry: countryInfo,
      mapCenter: [countryInfo.countryInfo.lat, countryInfo.countryInfo.long],
      mapZoom: 3,
    })
  }
  onClickCases = (e) => {
    // e.target.classList.contains("cases")
    console.log(e.target.parentElement.classList)
    this.setState({ casesType: "cases" })
    // if (this.state.casesType === "cases") {
    //   e.target.parentElement.classList.add("cases")
    // }
  }
  onClickRecovered = () => {
    this.setState({ casesType: "recovered" })
  }
  onClickDeaths = (e) => {
    this.setState({ casesType: "deaths" })
  }
  render() {
    const { mapCenter, mapZoom, mapCountries } = this.state
    return (
      <div className="App mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Header
                countryData={this.state.getCountryList}
                onChange={this.onChange}
              />
              <Boxs
                selectedCountry={this.state.selectedCountry}
                casesType={this.state.casesType}
                onClickCases={this.onClickCases}
                onClickRecovered={this.onClickRecovered}
                onClickDeaths={this.onClickDeaths}
              />
              <Leaflet
                mapCenter={mapCenter}
                mapZoom={mapZoom}
                mapCountries={mapCountries}
                casesType={this.state.casesType}
              />
            </div>
            <div className="col-md-4">
              <div className="card">
                <h3 className="card-header">Live Cases By Countries</h3>
                <Table allCountriesInfo={this.state.allCountriesInfo} />
                <div className="linegraph">
                  <h5>World Wide New {this.state.casesType}</h5>
                  <LineGraph casesType={this.state.casesType} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

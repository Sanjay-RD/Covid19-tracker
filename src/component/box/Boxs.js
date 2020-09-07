import React, { Component } from "react"
import Box from "./Box"

export class Boxs extends Component {
  render() {
    const { selectedCountry, casesType } = this.props
    return (
      <div className="row">
        <div className="col-md-4">
          <Box
            onClick={this.props.onClickCases}
            title="Cases"
            casesColor={casesType === "cases"}
            cases={selectedCountry.todayCases}
            total={selectedCountry.cases}
          />
        </div>
        <div className="col-md-4">
          <Box
            onClick={this.props.onClickRecovered}
            title="Recovered"
            recoveredColor={casesType === "recovered"}
            cases={selectedCountry.todayRecovered}
            total={selectedCountry.recovered}
          />
        </div>
        <div className="col-md-4">
          <Box
            onClick={this.props.onClickDeaths}
            title="Deaths"
            deathsColor={casesType === "deaths"}
            cases={selectedCountry.todayDeaths}
            total={selectedCountry.deaths}
          />
        </div>
      </div>
    )
  }
}

export default Boxs

import React, { Component } from "react"
import numeral from "numeral"

export class Table extends Component {
  render() {
    const { allCountriesInfo } = this.props
    return (
      <div className="card-body card-height">
        {/* <div className="card-body"></div> */}
        <table className="table table-striped">
          <tbody>
            {allCountriesInfo.map((country) => (
              <tr key={country.country}>
                <td>{country.country}</td>
                <td>{numeral(country.cases).format("0,0")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table

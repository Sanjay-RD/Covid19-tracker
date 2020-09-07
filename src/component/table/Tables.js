import React, { Component } from "react"

export class Tables extends Component {
  render() {
    const { allCountriesInfo } = this.props
    return (
      <div className="card-container">
        <h3>Live Cases By Countries</h3>
        <table>
          <tr>
            <th>Countries</th>
            <th>Cases</th>
          </tr>
          <div className="table-column">
            {allCountriesInfo.map((country) => (
              <tr key={country.country}>
                <td>{country.country}</td>
                <td>{country.cases}</td>
              </tr>
            ))}
          </div>
        </table>
      </div>
    )
  }
}

export default Tables

import React, { Component } from "react"

export class Header extends Component {
  render() {
    const { countryData } = this.props
    return (
      <header>
        <div className="row">
          <div className="col-md-6">
            <h1 className="text-danger">Covid-19 Tracker</h1>
          </div>
          <div className="col-md-6">
            {/* <FormControl variant="outlined">
              <Select>
                {countryData.map((country) => (
                  <MenuItem value={country.countryCode}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
            <div className="form-group">
              <select onChange={this.props.onChange} className="form-control">
                <option value="worldwide">Worldwide</option>
                {countryData.map((country) => (
                  <option key={country.name} value={country.countryCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header

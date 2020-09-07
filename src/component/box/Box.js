import React, { Component } from "react"
import { prettyPrint } from "../../util"
import classnames from "classnames"

export class Box extends Component {
  render() {
    const {
      title,
      cases,
      total,
      casesColor,
      recoveredColor,
      deathsColor,
    } = this.props
    console.log(casesColor)
    return (
      <div className="card shadow mb-2 hover__effect">
        <div
          className={classnames("card-body", {
            cases: casesColor,
            recovered: recoveredColor,
            deaths: deathsColor,
          })}
          onClick={this.props.onClick}
        >
          <h4 className="card-title ">{title}</h4>
          <h6 className="card-subtitle text-danger mb-2">
            {prettyPrint(cases)}
          </h6>
          <p className="card-text">{prettyPrint(total)}</p>
        </div>
      </div>
    )
  }
}

export default Box

import React, { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import axios from "axios"
import numeral from "numeral"

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0")
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a")
          },
        },
      },
    ],
  },
}

const buildChartData = (data, casesType = "cases") => {
  let chartData = []
  let lastDataPoint
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      }
      chartData.push(newDataPoint)
      // console.log(`this is y ${data["cases"][date]}`)
    }
    lastDataPoint = data[casesType][date]
    // console.log(`this is lastDataPoint ${lastDataPoint}`)
  }
  return chartData
}

function LineGraph({ casesType }) {
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
      )
      const data = res.data
      let chartData = buildChartData(data, casesType)
      // console.log(data)
      setData(chartData)
    }
    fetchData()
  }, [casesType])

  return (
    <div className="card-body">
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  )
}

export default LineGraph

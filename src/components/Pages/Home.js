import React from "react"
import { WatchListComponent } from "../WatchListComponent"
import ChartComponent from "../ChartComponent"

function Home() {
  return (
    <div className="row">
      <div className="col-6 col-md-3">
        <WatchListComponent />
      </div>
      <div className="col-12 col-md-9">
        <ChartComponent />
      </div>
    </div>
  )
}

export default Home

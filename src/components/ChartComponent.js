import React, { useEffect, useContext } from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import { GlobalContext } from "../context/GlobalState"

function ChartComponent() {
  const appState = useContext(GlobalContext)
  //Create AmChart Chart
  useEffect(() => {
    var chart = am4core.create("chartdiv", am4charts.XYChart)
    var watermark = new am4core.Label()
    console.log("Active Ticker: " + appState.activeTicker)
    console.log(appState)
    chart.padding(0, 15, 0, 15)

    chart.dataSource.url = `https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/download/${appState.activeTicker}?period1=${parseInt(new Date().setFullYear(new Date().getFullYear() - 1) / 1000)}&period2=${parseInt((new Date().getTime() / 1000).toFixed(0))}&interval=1d&events=history`
    //https://algocalcfunc.azurewebsites.net/api/arima_function?ticker=DNO.OL
    chart.dataSource.parser = new am4core.CSVParser()
    chart.dataSource.parser.options.useColumnNames = true
    chart.dataSource.parser.options.reverse = false
    // the following line makes value axes to be arranged vertically.
    chart.leftAxesContainer.layout = "vertical"

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0
    dateAxis.renderer.ticks.template.length = 8
    dateAxis.renderer.ticks.template.strokeOpacity = 0.1
    dateAxis.renderer.grid.template.disabled = true
    dateAxis.renderer.ticks.template.disabled = false
    dateAxis.renderer.ticks.template.strokeOpacity = 0.2
    dateAxis.renderer.minLabelPosition = 0.01
    dateAxis.renderer.maxLabelPosition = 0.99
    dateAxis.keepSelection = true
    dateAxis.minHeight = 30

    dateAxis.groupData = true
    dateAxis.minZoomCount = 5

    // these two lines makes the axis to be initially zoomed-in
    // dateAxis.start = 0.7;
    // dateAxis.keepSelection = true;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.tooltip.disabled = true
    valueAxis.zIndex = 1
    valueAxis.renderer.baseGrid.disabled = true
    // height of axis
    valueAxis.height = am4core.percent(65)

    valueAxis.renderer.gridContainer.background.fill = am4core.color("#000000")
    valueAxis.renderer.gridContainer.background.fillOpacity = 0.05
    valueAxis.renderer.inside = true
    valueAxis.renderer.labels.template.verticalCenter = "bottom"
    valueAxis.renderer.labels.template.padding(2, 2, 2, 2)

    //valueAxis.renderer.maxLabelPosition = 0.95;
    valueAxis.renderer.fontSize = "0.8em"

    var series = chart.series.push(new am4charts.CandlestickSeries())
    series.dataFields.dateX = "Date"
    series.dataFields.openValueY = "Open"
    series.dataFields.valueY = "Close"
    series.dataFields.lowValueY = "Low"
    series.dataFields.highValueY = "High"
    series.clustered = false
    series.connect = false
    series.tooltipText = "open: {openValueY.value}\nlow: {lowValueY.value}\nhigh: {highValueY.value}\nclose: {valueY.value}"
    series.name = appState.activeTicker

    series.opacity = 0.5
    series.defaultState.transitionDuration = 1
    var fillModifier = new am4core.LinearGradientModifier()
    fillModifier.opacities = [1, 0]
    fillModifier.offsets = [0, 1]
    fillModifier.gradient.rotation = 90
    series.fillModifier = fillModifier

    chart.cursor = new am4charts.XYCursor()

    var scrollbarX = new am4charts.XYChartScrollbar()

    var sbSeries = chart.series.push(new am4charts.LineSeries())
    sbSeries.dataFields.valueY = "Close"
    sbSeries.dataFields.dateX = "Date"
    scrollbarX.series.push(sbSeries)
    sbSeries.disabled = true
    scrollbarX.marginBottom = 20
    chart.scrollbarX = scrollbarX
    scrollbarX.scrollbarChart.xAxes.getIndex(0).minHeight = undefined

    watermark.text = appState.activeTicker
    watermark.toFront()
    chart.plotContainer.children.push(watermark)
    watermark.fontSize = 120
    watermark.opacity = 0.2
    watermark.align = "center"
    watermark.valign = "middle"

    return () => {
      chart.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState.activeTicker])

  return (
    <>
      <div id="chartdiv" style={{ width: "100%", height: "550px" }}></div>
      <div id="infoWrapper" style={{ display: "block" }}>
        <div className="center infoBox">
          <pre>{appState.arima}</pre>
        </div>
      </div>
    </>
  )
}

export default ChartComponent

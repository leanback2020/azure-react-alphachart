import React, { useContext } from "react"
import AddWatchListItem from "./AddWatchListItem"

import sharpe from "../../src/images/sharperatio.png"
import { GlobalContext } from "../context/GlobalState"
import LoadingDotsIcon from "./LoadingDotsIcon"
import { WatchList } from "./WatchList"
import { Popover, OverlayTrigger, Button } from "react-bootstrap"

export const WatchListComponent = () => {
  const { sharperatio, stocks, calculating, getSharpeRatio } = useContext(GlobalContext)

  function handleGetSharpeRatio() {
    var symbols = ""

    console.log("handleGetSharpeRatio loading: " + calculating)
    console.log(stocks)
    stocks.forEach(function (stock, i) {
      symbols = symbols + stock.ticker + ","
    })
    symbols = symbols.substring(0, symbols.length - 1)
    getSharpeRatio(symbols)
    console.log("handleGetSharpeRatio after: " + symbols)
  }

  return (
    <>
      <AddWatchListItem className="container" />
      <WatchList />
      <OverlayTrigger
        trigger="click"
        placement="right"
        overlay={
          <Popover id={`popover-positioned-right`}>
            <Popover.Title as="h3">Portfolio Sharpe Ratio</Popover.Title>
            <Popover.Content>
              <img width="250" style={{ float: "left", margin: "8px 0px" }} height="80" src={sharpe} alt="sharperatio" />
              <br />
              {!calculating ? (
                <p>
                  Sharpe Ratio = <strong>{sharperatio.toFixed(4)}</strong>
                </p>
              ) : (
                <>
                  <p>Calculating... Please Wait...</p>
                  <LoadingDotsIcon />
                </>
              )}
            </Popover.Content>
          </Popover>
        }
      >
        <Button style={{ padding: "5px", margin: "5px 30px" }} onClick={() => handleGetSharpeRatio()} variant="success">
          Calc Sharpe Ratio
        </Button>
      </OverlayTrigger>
    </>
  )
}

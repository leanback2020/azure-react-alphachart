import React, { useContext } from "react"
import { GlobalContext } from "../context/GlobalState"

export const WatchListItem = ({ stock }) => {
  const { activeTicker, updateTicker } = useContext(GlobalContext)
  function getStyleShort() {
    return {
      background: "#f4f4f4",
      padding: "5px",
      borderBottom: "1px #ccc dotted",
      width: "220px",
      height: "Auto",
    }
  }

  function handleClick(ticker) {
    console.log("handleClick before: " + activeTicker)
    updateTicker(ticker)
    console.log("handleClick after: " + activeTicker)
  }

  // <input onChange={(e) => dispatch({ type: "usernameImmediately", value: e.target.value }
  const { ticker, percent, last } = stock
  return (
    <div style={getStyleShort()}>
      {percent >= 0 ? (
        <button style={btnStyleInPostive} onClick={(e) => handleClick(e.target.innerHTML.split(" ")[0])}>
          {ticker} {percent}% {last}
        </button>
      ) : (
        <button style={btnStyleInNegative}>
          {ticker} {percent}% {last}
        </button>
      )}
    </div>
  )
}

//PropTypes
const btnStyleInPostive = {
  background: "#0C0",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "20%",
  cursor: "pointer",
  margin: "0px 10px",
}

const btnStyleInNegative = {
  background: "#C00",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "20%",
  cursor: "pointer",
  margin: "0px 10px",
}

export default WatchListItem

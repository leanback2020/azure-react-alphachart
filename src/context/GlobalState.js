import React, { createContext, useReducer } from "react"
import axios from "axios"
import AppReducer from "./AppReducer"

// Initial state
const initialState = {
  stocks: [],
  indicies: [],
  error: null,
  loading: true,
  messages: [],
  domainid: "",
  arima: "",
  activeTicker: "MSFT",
}

// Create context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)
  // Actions
  function updateTicker(ticker) {
    console.log("updateTicker: " + ticker)
    try {
      dispatch({
        type: "SET_NEW_TICKER",
        payload: ticker,
      })
      console.log("Update ticker new: " + state.activeTicker)
    } catch (err) {
      dispatch({
        type: "TODOITEM_ERROR",
        payload: err,
      })
    }
  }

  async function getWatchListByUserId(userid) {
    console.log("getWatchListByUserId: " + userid)
    try {
      const response = await axios.get(`https://alpha-chart-func.azurewebsites.net/api/watchlist/${userid}`)
      console.log("Response: " + response.data)
      dispatch({
        type: "GET_WATCHLIST",
        payload: response.data,
      })
    } catch (err) {
      dispatch({
        type: "TODOITEM_ERROR",
        payload: err,
      })
    }
  }

  async function getARIMAmodel(ticker) {
    console.log("getARIMAmodel: " + ticker)
    try {
      const response = await axios.get(`https://algocalcfunc.azurewebsites.net/api/arima_function?ticker=${ticker}`)
      console.log("Response: " + response.data)
      dispatch({
        type: "GET_ARIMA",
        payload: response.data,
      })
    } catch (err) {
      dispatch({
        type: "TODOITEM_ERROR",
        payload: err,
      })
    }
  }
  //https://algocalcfunc.azurewebsites.net/api/arima_function?ticker=DNO.OL

  async function getIndexData() {
    console.log("getIndexData: ")
    try {
      const response = await axios.get(`https://alpha-chart-func.azurewebsites.net/api/index/`)
      console.log("Response: " + response.data)
      dispatch({
        type: "GET_INDEXDATA",
        payload: response.data,
      })
    } catch (err) {
      dispatch({
        type: "TODOITEM_ERROR",
        payload: err,
      })
    }
  }

  async function addWatchListItem(stock) {
    try {
      const response = await axios.post("https://alpha-chart-func.azurewebsites.net/api/AddWatchListItem?code=JBpWNoHKzU7k9qGVwU2CnZNMuiDNsInxE92dyFC7DdpOrBiDd/ajMQ==", {
        ticker: stock.ticker,
        userid: stock.userid,
      })
      stock._id = response.data._id
      dispatch({
        type: "ADD_WATCHLISTITEM",
        payload: stock,
      })
      dispatch({
        type: "flashMessage",
        value: "Added WatchList Item Successfully!",
      })
      getWatchListByUserId(stock.userid)
    } catch (err) {
      dispatch({
        type: "TODOITEM_ERROR",
        payload: err,
      })
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        stocks: state.stocks,
        indicies: state.indicies,
        error: state.error,
        loading: state.loading,
        messages: state.messages,
        domainid: state.domainid,
        arima: state.arima,
        activeTicker: state.activeTicker,
        getIndexData,
        getARIMAmodel,
        getWatchListByUserId,
        updateTicker,
        addWatchListItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
export default GlobalProvider

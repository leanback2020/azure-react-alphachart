import React, { useEffect, useContext } from "react"
import TodoItem from "./WatchListItem"
import LoadingDotsIcon from "./LoadingDotsIcon"
import { GlobalContext } from "../context/GlobalState"
import { useAuth0 } from "@auth0/auth0-react"

export const WatchList = () => {
  const { stocks, getWatchListByUserId, loading } = useContext(GlobalContext)
  const { user } = useAuth0()
  var myData = []

  useEffect(() => {
    getWatchListByUserId(user.sub.split("|")[1])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <LoadingDotsIcon />
  } else {
    myData = [...stocks].sort((a, b) => b.percent - a.percent) //Sort by percentage gain/loss
  }

  return myData.map((stock) => <TodoItem key={stock.id} stock={stock} />)
}

import React from "react"
import AddWatchListItem from "./AddWatchListItem"
import { WatchList } from "./WatchList"

export const WatchListComponent = () => {
  return (
    <>
      <AddWatchListItem className="container" />
      <WatchList />
    </>
  )
}

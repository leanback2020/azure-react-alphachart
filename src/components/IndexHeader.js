import React, { useEffect, useContext } from "react"
import { IndexComponent } from "./IndexComponent"
import { GlobalContext } from "../context/GlobalState"

export const IndexHeader = () => {
  const { indicies, getIndexData } = useContext(GlobalContext)

  useEffect(() => {
    getIndexData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      getIndexData()
    }, 15000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return indicies.map((indexData) => <IndexComponent key={indexData.id} indexData={indexData} />)
}

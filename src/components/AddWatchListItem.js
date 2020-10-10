import React, { useState, useContext } from "react"
import { GlobalContext } from "../context/GlobalState"
import { useAuth0 } from "@auth0/auth0-react"

function AddWatchListItem() {
  const [text, setText] = useState("")
  const { addWatchListItem } = useContext(GlobalContext)
  const { user } = useAuth0()

  async function onSubmit(e) {
    e.preventDefault()
    console.log("AddWatchListItem onSubmit - Title: " + text)
    console.log("UserId: " + user.sub.split("|")[1])
    try {
      const newWatchListItem = {
        ticker: text,
        userid: user.sub.split("|")[1],
      }
      addWatchListItem(newWatchListItem)
      setText("")
    } catch (error) {
      console.log("Could not submit item: " + error)
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", width: "310px" }}>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} style={{ flex: "10", padding: "5px" }} placeholder="Enter ticker..." />
      <input id="Submit" data-cy="Submit" type="Submit" value="Submit" className="btn" style={{ flex: "1" }} />
    </form>
  )
}

export default AddWatchListItem

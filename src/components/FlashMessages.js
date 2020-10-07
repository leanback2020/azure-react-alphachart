import React, { useContext } from "react"
import { GlobalContext } from "../context/GlobalState"

function FlashMessages(props) {
  const { messages } = useContext(GlobalContext)
  return (
    <div className="floating-alerts">
      {messages.map((msg, index) => {
        return (
          <div key={index} className="alert alert-success text-center floating-alert shadow-sm">
            {msg}
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessages

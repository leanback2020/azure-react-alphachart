import React from "react"
import { useAuth0 } from "@auth0/auth0-react"

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <div className="col-md-auto">
      <button data-cy style={btnStyleLogin} onClick={() => loginWithRedirect()}>
        Log In
      </button>
    </div>
  )
}

const btnStyleLogin = {
  background: "#0C0",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "20%",
  cursor: "pointer",
  margin: "0px 20px",
}

export default LoginButton

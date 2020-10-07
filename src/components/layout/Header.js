import React from "react"
import { Link } from "react-router-dom"
import logo from "../../images/leanBack.png"
import { useAuth0 } from "@auth0/auth0-react"
import LoginButton from "../LoginButton"
import LogoutButton from "../LogoutButton"

const headerStyle = {
  background: "#391633",
  color: "#fff",
  textAlign: "center",
  padding: "10px",
  flex: "1",

  height: "90px",
}
function Header() {
  const { isAuthenticated } = useAuth0()
  return (
    <>
      <header style={headerStyle}>
        <img width="250" style={{ float: "left" }} height="80" src={logo} alt="logo" />
        <div style={{ float: "left", margin: "0px 0px" }}>
          <h2>AlphaChart</h2>
          <div style={{ margin: "-5px 0px" }}>
            <Link style={linkStyle} to="/">
              Home
            </Link>{" "}
            |{" "}
            <Link style={linkStyle} to="/about">
              About
            </Link>
          </div>
        </div>
        <div style={{ float: "right", margin: "10px 50px" }}>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</div>
      </header>
    </>
  )
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
}

export default Header

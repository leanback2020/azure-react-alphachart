import React from "react"
import { GitHubIcon } from "../icons"

function About() {
  return (
    <div id="inner">
      <br />
      <br />
      <h1>About</h1>
      <br />
      <p className="lead text-muted">This is a small react app, using Azure Static Web Site with GitHub Action/workflow for CI/CD.</p>
      <br />
      <p>
        The app is using a serverless backend with Azure Functions, to store data in a Mongo database.
        <br /> Auth0 is used for authentication.
        <br />
        Yahoo API is used for fetching financial data
      </p>
      <br />
      <p>This react app is using some basic react features (hooks) like: useEffect, useState, useContext, useReducer, createContext, BrowserRouter, Switch, Route </p>
      <br />
      <p>GitHub</p>
      <a className="btn btn-primary" href="https://github.com/leanback2020/azure-react-alphachart.git">
        <GitHubIcon width={"18px"} /> <span className="ml-2 mr-4">Visit Repo</span>
      </a>
    </div>
  )
}

export default About

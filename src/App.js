import React, { Suspense } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from "./components/Pages/Home"
import Header from "./components/layout/Header"
import About from "./components/Pages/About"
import LoadingDotsIcon from "./components/LoadingDotsIcon"
import FlashMessages from "./components/FlashMessages"
import { GlobalProvider } from "./context/GlobalState"
import { useAuth0 } from "@auth0/auth0-react"
import { IndexHeader } from "./components/IndexHeader"
import "./App.css"

function App() {
  const { isAuthenticated } = useAuth0()
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <IndexHeader />
        <Suspense fallback={<LoadingDotsIcon />}></Suspense>
        <FlashMessages />
        <Switch>
          <Route exact path="/">
            {isAuthenticated ? (
              <>
                <Home />
              </>
            ) : (
              <h5>Please log in! </h5>
            )}
          </Route>
          <Route path="/about" exact component={About} />
        </Switch>
      </BrowserRouter>
    </GlobalProvider>
  )
}
export default App

// import React, { useState, useEffect, useContext, useLayoutEffect, useRef } from "react"
// import Page from "./Page"
// import axios from "axios"
// import { useImmerReducer } from "use-immer"
// import { CSSTransition } from "react-transition-group"
// import DispatchContext from "../DispatchContext"

// function ComponentName() {
//   return (
//     <Page title="Home" wide={true}>
//       <div className="row align-items-center">
//         <div className="col-lg-7 py-3 py-md-5">
//           <h1 className="display-3">Welcome!!</h1>
//           <div id="chartdiv" style={{ width: "100%", height: "450px" }}></div>
//         </div>
//         <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="username-register" className="text-muted mb-1">
//                 <small>Username</small>
//               </label>
//               <input onChange={(e) => dispatch({ type: "usernameImmediately", value: e.target.value })} id="username-register" name="username" className="form-control" type="text" placeholder="Pick a username" autoComplete="off" />
//               <CSSTransition in={state.username.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
//                 <div className="alert alert-danger small liveValidateMessage">{state.username.message}</div>
//               </CSSTransition>
//             </div>
//             <div className="form-group">
//               <label htmlFor="email-register" className="text-muted mb-1">
//                 <small>Email</small>
//               </label>
//               <input onChange={(e) => dispatch({ type: "emailImmediately", value: e.target.value })} id="email-register" name="email" className="form-control" type="text" placeholder="you@example.com" autoComplete="off" />
//               <CSSTransition in={state.email.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
//                 <div className="alert alert-danger small liveValidateMessage">{state.email.message}</div>
//               </CSSTransition>
//             </div>
//             <div className="form-group">
//               <label htmlFor="password-register" className="text-muted mb-1">
//                 <small>Password</small>
//               </label>
//               <input onChange={(e) => dispatch({ type: "passwordImmediately", value: e.target.value })} id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" />
//               <CSSTransition in={state.password.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
//                 <div className="alert alert-danger small liveValidateMessage">{state.password.message}</div>
//               </CSSTransition>
//             </div>

//             <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
//               Sign up
//             </button>
//           </form>
//         </div>
//       </div>
//     </Page>
//   )
// }

// export default ComponentName

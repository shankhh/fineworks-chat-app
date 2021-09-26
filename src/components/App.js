import React from "react"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { AuthProvider } from "../contexts/AuthContext";

//Toast 
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import Chats from "./Chats"
import Login from "./Login"
import Dashboard from "./Dashboard"

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <ToastContainer />
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/chats" component={Chats} />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App

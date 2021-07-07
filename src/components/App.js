import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Header from './Header'
import Footer from "./Footer"

import StudentIndex from "./Student/StudentIndex"
import TeacherIndex from "./Teacher/Index"
import LevelIndex from "./Level/Index"
import CourseTypeIndex from "./CourseType/Index"
import CourseIndex from "./Course/Index"

import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "30vh", maxWidth: "10000px"}}
    >
      <div className="w-100">
        <Router>
          <AuthProvider>
          <Header/>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/profile" component={Dashboard} />
              <Route path="/teacher" component={TeacherIndex} />
              <Route path="/student" component={StudentIndex} />
              <Route path="/course" component={CourseIndex} />
              <Route path="/course-type" component={CourseTypeIndex} />
              <Route path="/level" component={LevelIndex} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>

          <Footer />
        </Router>
      </div>
    </Container>
  )
}

export default App

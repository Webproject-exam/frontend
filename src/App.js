import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from './routes/AdminRoute';
import Dashboard from './components/Dashboard/Dashboard';
import ForgotPasswordEmailForm from './components/ForgotPasswordEmailForm/ForgotPasswordEmailForm';
import LogInForm from './components/Login/LogInForm';
import MyProfile from './components/MyProfile/MyProfile';
import NavBar from './components/NavBar/NavBar';
import PrivateRoute from './routes/PrivateRoute';
import StatusCard from './components/StatusCard/StatusCard';
import forgotBackend from './components/HOC/ForgotPassHOC';
import navBarBackend from './components/HOC/NavBarHOC';
import withUserBackEnd from './components/HOC/MyProfileHOC';
import { AuthConsumer } from './helpers/Auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import AboutPage from './components/AboutPage/AboutPage'
import Footer from './components/Footer/Footer';
import PlantList from './components/PlantList/PlantList';
import PlantStatusCard from './components/PlantStatusCard/PlantStatusCard'


let plant = {
  name: "Arkapalme",
  placement: {
    building: "Fabrikken (Bygg 115/159)",
    floor: "2. etg",
    room: "Rom 206"
  },
  watering: {
    frequency: "every 14 days",
    next: "3 days",
    responsible: "Ola Nordmann",
    last_watered_by: "Kari Nordmann",
    last_watered_date: "5. april 2021",
    last_postponed: "2. april 2021",
    postponed_reason: "still moist"
  },
  fertilization: {
    frequency: "every 60 days",
    next: "27 days"
  },
  ligtning: "Average",
  added: "1. jan 2020"
}

class App extends Component {
  render() {

    const MyProfileWithHOC = withUserBackEnd(MyProfile);
    const ForgotPassHOC = forgotBackend(ForgotPasswordEmailForm);
    const NavBarHOC = navBarBackend(NavBar);

    return (
      <AuthConsumer>
        {({ isAuth }) => (
          <>
            <Router>
              <NavBarHOC />
              <main>
                <Switch>
                  <Route exact path="/reset_password">
                    <ForgotPassHOC />
                  </Route>
                  <PrivateRoute exact path="/profile">
                    <h1>Your Profile</h1>
                    <MyProfileWithHOC />
                  </PrivateRoute>
                  <PrivateRoute exact path="/dashboard">
                    <AdminRoute >
                      <h1>Dashboard</h1>
                      <Dashboard />
                    </AdminRoute>
                  </PrivateRoute>
                  <Route exact path="/logout">
                    <h1>You are now logged out!</h1>
                  </Route>
                  <Route exact path="/login">
                    <LogInForm />
                  </Route>
                  <Route exact path="/ja">
                    <PlantStatusCard plant={plant}/>
                  </Route>
                  <Route exact path="/">
                    <h1>Overview</h1>
                    <PlantList />
                  </Route>
                  <Route exact path="/about">
                    <AboutPage />
                  </Route>
                  <Route exact path="/403">
                    <StatusCard statusCode={403} statusText="Forbidden" />
                  </Route>
                  <Route>
                    <StatusCard statusCode={404} statusText="Page Not Found" />
                  </Route>
                </Switch>
              </main>
              <Footer />
            </Router>
            <ToastContainer transition={Slide} />
          </>
        )}
      </AuthConsumer>
    );
  }
}

export default App;
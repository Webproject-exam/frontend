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
import { AuthConsumer, AuthContext } from './helpers/Auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import AboutPage from './components/AboutPage/AboutPage';
import Footer from './components/Footer/Footer';
import PlantList from './components/PlantList/PlantList';
import IndividualPlantPage from './components/IndividualPlantPage/IndividualPlantPage'
import withPlantFetch from './components/HOC/PlantListHOC';
import fetchPlantBackend from './components/HOC/PlantPageHOC';
import Popup from './components/Popup/Popup';
import Prompt from './components/Prompt/Prompt';


class App extends Component {
  static contextType = AuthContext;
  componentDidMount(){
    this.refreshToken();
    this.tokenRefresh = setInterval(() => this.refreshToken(), 300000);
  }

  componentWillUnmount(){
    clearInterval(this.tokenRefresh);
  }

  refreshToken = () => {
    this.context.refreshToken();
  }

  plantPage = () => {
    const IndividualPlantHOC = fetchPlantBackend(IndividualPlantPage);
    return (<IndividualPlantHOC />);
}

  render() {
    const MyProfileWithHOC = withUserBackEnd(MyProfile);
    const ForgotPassHOC = forgotBackend(ForgotPasswordEmailForm);
    const NavBarHOC = navBarBackend(NavBar);
    const PlantListHOC = withPlantFetch(PlantList);

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
                    <MyProfileWithHOC />
                  </PrivateRoute>
                  <PrivateRoute exact path="/manage">
                    <AdminRoute >
                      <Dashboard />
                    </AdminRoute>
                  </PrivateRoute>
                  <Route exact path="/login">
                    <LogInForm />
                  </Route>
                  <Route exact path="/plants">
                    <PlantListHOC />
                  </Route>
                  <Route exact path="/prompt">
                  <Prompt type="delete" user={{name:"sfjsdfgsjdhfgjshdgfjshdgfjsdgfhsdgfjsgdfjh"}}/>
                  <Prompt type="confirm" plant={{name:"sfjsdhdgfjsdgfhsdgfjsgdfjh"}}/>
                  <Prompt type="delete" plant={{name:"sfjsdfgsjdhfgjshdgfjshdgfjsdgfhsdgfjsgdfjh"}}/>
                  </Route>
                  <Route exact path="/plants/:id" render={this.plantPage} />
                  <Route exact path="/">
                    <AboutPage />
                  </Route>
                  <Route exact path="/pops">
                    <Popup content={<Prompt type="delete" user={{name:"sfjsdfgsjdhfgjshdgfjshdgfjsdgfhsdgfjsgdfjh"}}/>} />
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
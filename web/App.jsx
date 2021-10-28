import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import {theme} from './theme';
import {ThemeProvider, createTheme} from '@mui/material/styles';

import {LoadingProvider} from './LoadingContext';
import {AuthContextProvider} from './AuthContext';

import LoadingVeil from './LoadingVeil';
import LoggedInPage from './LoggedInPage';
import LoginPage from './LoginPage';
import SignUp from './SignUp';

const builtTheme = createTheme(theme);


const App = () => {

  return (
    <ThemeProvider theme={builtTheme}>
      <Router>
        <LoadingProvider>
          <AuthContextProvider>
            <LoadingVeil />
            <Switch>
              <Route path="/login" exact component={LoginPage} />
              <Route path="/app" component={LoggedInPage} />
              <Route path="/createAccount" component={SignUp} />
              <Redirect to="/app/dashboard"/>
            </Switch>
          </AuthContextProvider>
        </LoadingProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
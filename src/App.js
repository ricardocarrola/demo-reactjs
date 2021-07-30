import React  from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './core/services/AuthContext';
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';
import PrivateRoute from './core/PrivateRoute';
import DashboardPage from './pages/Dashboard/DashboardPage';
import StorageProvider from './core/services/StorageContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <StorageProvider>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <PrivateRoute exact path="/" component={DashboardPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
            </Switch>
          </div>
        </BrowserRouter>
      </StorageProvider>
    </AuthProvider>
  );
}

export default App;

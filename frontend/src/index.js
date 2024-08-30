import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LandingPage from './dashboard/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './style.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './dashboard/MainPage';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import AdminPage from './dashboard/AdminPage';
import AdminMenu from './dashboard/AdminMenu';
import AddNewCar from './dashboard/AddNewCar';
import CarSelect from './dashboard/CarSelect';
import DriverPanel from './dashboard/DriverPanel';
import { Provider } from 'react-redux'
import { appStore } from './dashboard/redux/Store';
import TicketPage from './dashboard/TicketPage';
import PaymentPage from './dashboard/PaymentPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />}>
            <Route path='' element={<LoginPage />} />
            <Route path='/home' element={<LandingPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/carselect' element={<CarSelect />} />
            <Route path='/ticket' element={<TicketPage />} />
            <Route path='/payment' element={<PaymentPage />} />
          </Route>
          <Route path='admin' element={<AdminPage />}>
            <Route path='' element={<AdminMenu />} />
            <Route path='addnewcar' element={<AddNewCar />} />
          </Route>
          <Route path='driver' element={<DriverPanel />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();

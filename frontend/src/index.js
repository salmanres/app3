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
import { appStore, persistor } from './dashboard/redux/Store';
import TicketPage from './dashboard/TicketPage';
import PaymentPage from './dashboard/PaymentPage';
import { PersistGate } from 'redux-persist/integration/react';
import MyTicket from './dashboard/MyTicket';
import Myhistory from './dashboard/MyHistory';
import ModifyTicket from './dashboard/ModifyTicket';
import BookingList from './dashboard/BookingList';
import DriverLandingPage from './dashboard/DriverLandingPage';
import NewRoute from './dashboard/NewRoute';
import CreateBooking from './dashboard/CreateBooking';
import MyProfile from './dashboard/MyProfile';
import Emergency from './dashboard/Emergency';
import RouteList from './dashboard/RouteList';
import ErrorPage from './dashboard/ErrorPage';
import LoginDriver from './auth/LoginDriver';
import AddNewDriver from './dashboard/AddNewDriver';
import 'react-toastify/dist/ReactToastify.css';
import AddNewRoute from './dashboard/AddNewRoute';
import BlockDriver from './dashboard/BlockDriver';
import DriverProfile from './dashboard/DriverProfile';
import CarData from './dashboard/CarData';
import CarDetails from './dashboard/CarDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage />}>
              <Route path='' element={<LoginPage />} />
              <Route path='/home' element={<LandingPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/carselect' element={<CarSelect />} />
              <Route path='/ticket' element={<TicketPage />} />
              <Route path='/payment' element={<PaymentPage />} />
              <Route path='/myticket' element={<MyTicket />} />
              <Route path='/history' element={<Myhistory />} />
              <Route path='/modifyticket/:id' element={<ModifyTicket />} />
              <Route path='/routelist' element={<RouteList />} />
              <Route path='/emergency' element={<Emergency />} />
              <Route path='*' element={<ErrorPage />} />
            </Route>
            <Route path='admin' element={<AdminPage />}>
              <Route path='' element={<AdminMenu />} />
              <Route path='addnewcar' element={<AddNewCar />} />
              <Route path='addnewdriver' element={<AddNewDriver />} />
              <Route path='addnewroute' element={<AddNewRoute />} />
              <Route path='driverdata' element={<BlockDriver />} />
              <Route path='driverprofile/:id' element={<DriverProfile />} />
              <Route path='cardata' element={<CarData />} />
              <Route path='cardetails/:id' element={<CarDetails />} />
            </Route>
            <Route path='driver' element={<LoginDriver />} />
            <Route path='driverpanel' element={<DriverLandingPage />}>
              <Route path='' element={<DriverPanel />} />
              <Route path='driverhome' element={<DriverPanel />} />
              <Route path='bookinglist' element={<BookingList />} />
              <Route path='newroute' element={<NewRoute />} />
              <Route path='createbooking' element={<CreateBooking />} />
              <Route path='myprofile' element={<MyProfile />} />
              <Route path='emergency' element={<Emergency />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();

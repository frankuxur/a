import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import './css/App.css'
import 'remixicon/fonts/remixicon.css'
import Home from './pages/Home '
import Register from './pages/Register'
import Layout from './components/Layout'
import { UserContextProvider } from './context/UserContext'
import { PlaceContextProvider } from './context/PlaceContext'
import PrivateRoutes from './utils/PrivateRoutes'
import Account from './pages/AccountSettings'
import Host from './pages/Host'
import Hosting from './pages/Hosting'
import BecomeAHost from './pages/BecomeAHost'
import Create from './pages/Create'
import PlacePage from './pages/PlacePage'
import Profile from './pages/Profile'
import PaymentSuccessful from './pages/PaymentSuccessful'
import Trips from './pages/Trips'
import Listings from './pages/Listings'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  
  return (
    <UserContextProvider>
      <PlaceContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/place/:id' element={<PlacePage />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Layout />}>
              <Route path='/account-settings' element={<Account />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/payment-successful/:id' element={<PaymentSuccessful />} />
              <Route path='/trips' element={<Trips />} />
            </Route>
            <Route path='/host' element={<Host />} />
            <Route path='/hosting' element={<Hosting />} />
            <Route path='/become-a-host' element={<BecomeAHost />} />
            <Route path='/become-a-host/create' element={<Create />} />
            <Route path='/hosting/listings' element={<Listings />} />
          </Route>
        </Routes>
      </PlaceContextProvider>
    </UserContextProvider>
  )
}

export default App

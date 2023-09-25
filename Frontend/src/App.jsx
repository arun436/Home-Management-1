
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import './App.css'
import Dashboard from './components/Dashboard'
import User from './components/Users/User'
import AddUser from './components/Users/AddUser'
import EditUser from './components/Users/EditUser'
import Login from './components/Login/Login.jsx'
import Home from './components/Home'
import ViewSubscription from './components/Subscriptions/ViewSubscription'
import AddSubscription from './components/Subscriptions/AddSubscription'
import EditSubscription from './components/Subscriptions/EditSubscription'
import ViewDocument from './components/Documents/ViewDocument'
import AddDocument from './components/Documents/AddDocument'
import EditDocument from './components/Documents/EditDocument'
import Profile from './components/Profile/Profile'
import UpdateProfile from './components/Profile/UpdateProfile'
import Register from './components/Register/Register'

function App() {
return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login />}></Route>
    <Route path='/register' element={<Register />}></Route>
      <Route path='/dashboard' element={<Dashboard />}>
        <Route path='/dashboard/home' element={<Home />}></Route>
        <Route path='/dashboard/user' element={<User />}></Route>
        <Route path='/dashboard/profile' element={<Profile />}></Route>
        <Route path='/dashboard/create' element={<AddUser />}></Route>
        <Route path='/dashboard/userEdit/:id' element={<EditUser />}></Route>
        <Route path='/dashboard/subscription' element={<ViewSubscription />}></Route>
        <Route path='/dashboard/createsubscription' element={<AddSubscription />}></Route>
        <Route path='/dashboard/subscriptionEdit/:id' element={<EditSubscription />}></Route>
        <Route path='/dashboard/document' element={<ViewDocument />}></Route>
        <Route path='/dashboard/createdocument' element={<AddDocument />}></Route>
        <Route path='/dashboard/documentEdit/:id' element={<EditDocument />}></Route>
        <Route path='/dashboard/profileEdit/:id' element={<UpdateProfile />}></Route>
      </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'


import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import Users from './pages/admin/Users';
import Logout from './pages/admin/Logout';
import ComplaintTypes from './pages/admin/ComplaintTypes';
import CollegeManagement from './pages/admin/CollegeManagement';
import SessionManagement from './pages/admin/SessionManagement';
import UserManagement from './pages/admin/UserManagement';
import Complaints from './pages/admin/Complaints';
import AdminDiscussionForum from "./pages/admin/DiscussionForum";
import BlockedUser from './pages/admin/BlockedUser';
import ChangePassword from './pages/admin/ChangePassword';
import UserDashboard from "./pages/users/UserDashboard";
import UserHome from "./pages/users/UserHome";
import AddComplaint from "./pages/users/AddComplaint";
import MyComplaints from "./pages/users/MyComplaints";
import DiscussionForum from "./pages/users/DiscussionForum";
import UpdateProfile from "./pages/users/Profile";
import ChangePasswordUser from "./pages/users/ChangePassword";
import UserLogout from "./pages/users/Logout";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/adminlogin' element={<AdminLogin />}></Route>
          <Route path='/user-login' element={<UserLogin />}></Route>
          <Route path='/register' element={<UserRegister />}></Route>


          {/* admin route */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />

            <Route path="complaint-types" element={<ComplaintTypes />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="colleges" element={<CollegeManagement />} />
            <Route path="sessions" element={<SessionManagement />} />

            <Route path="discussion-forum" element={<AdminDiscussionForum />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="blocked-users" element={<BlockedUser />} />

            <Route path="change-password" element={<ChangePassword />} />
            <Route path="logout" element={<Logout />} />
          </Route>

          {/* User Routes */}

          <Route path="/user" element={<UserDashboard />}>

            <Route index element={<UserHome />} />

            <Route
              path="add-complaint"
              element={<AddComplaint />}
            />

            <Route
              path="my-complaints"
              element={<MyComplaints />}
            />

            

            <Route path="discussion-forum" element={<DiscussionForum />} />

            <Route
              path="profile"
              element={<UpdateProfile />}
            />

            <Route
              path="change-password"
              element={<ChangePasswordUser />}
            />

            <Route
              path="logout"
              element={<UserLogout />}
            />

          </Route>
    </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App

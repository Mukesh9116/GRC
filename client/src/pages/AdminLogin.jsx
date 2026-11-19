import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/cms.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const [data , setData ] = useState({
      "email":'',
      "password":''
    })

    const handleChange = (e) => {
      // console.log(e);
      setData(()=>({
        ...data,[e.target.name]:e.target.value
      }))  
    }
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await axios.post('http://localhost:2411/api/admin/login',data)
      
      if(res.data.msg === "success"){
        localStorage.setItem("adminId",res.data.adminId)
        localStorage.setItem("adminName",res.data.name)
        localStorage.setItem("adminToken",res.data.token)
        navigate('/admin')
      }
    }
      
      
    
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" style={{ width: '60px' }} />
          <h4 className="fw-bold mt-2 mb-0">Admin Panel</h4>
          <small className="text-muted">Secure login to manage grievances</small>
        </div>

        <form action="" onSubmit={handleSubmit} method="POST">
          <div className="mb-3">
            <label className="form-label fw-bold small">Admin Email</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="admin@lnmu.ac.in"
              name="email"
              required 
              onChange={handleChange}
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label fw-bold small">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="********"
              name="password"
              required 
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-dark w-100 fw-bold">Login Securely</button>
        </form>

        <div className="text-center mt-3">
          <Link to="/" className="text-decoration-none small text-muted">
            <i className="bi bi-arrow-left"></i> Back to Home
          </Link>
        </div>

      </div>
    </div>
  )
}

export default AdminLogin
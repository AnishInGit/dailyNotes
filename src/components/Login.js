import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    let navigate= useNavigate();
    const [credencial, setCredencial] = useState({email:"",password:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json"
            },body: JSON.stringify({email: credencial.email,password: credencial.password})
             });
             const json = await response.json() // parses JSON response into native JavaScript objects
             console.log(json)
             if(json.success){
                  //Save the authtoken and redirect
                  localStorage.setItem('token',json.authToken)
                  navigate("/")
             }
             else{
                alert("Invalid User")
             }
    }
    const onChange = (e) => {
        setCredencial({ ...credencial, [e.target.name]: e.target.value });
      };
  return (
    <div>
      <form  onSubmit={handleSubmit}>
        <h1>Login</h1>
        <br />
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control w-50" id="email" name='email' onChange={onChange} value={credencial.email} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control w-50" name='password' onChange={onChange} value={credencial.password} id="password"/>
  </div>

  <button type="submit" className="btn btn-primary">Login</button>
</form>
    </div>
  )
}

export default Login

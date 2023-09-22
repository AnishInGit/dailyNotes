import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    let navigate= useNavigate();
    const [credencial, setCredencial] = useState({name:"",email:"",password:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {name,email,password}=credencial;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {        
            method: "POST",
            headers: { 
              "Content-Type": "application/json"
            },body: JSON.stringify({name,email,password})
             });
             const json = await response.json() // parses JSON response into native JavaScript objects
             console.log(json)
                  //Save the authtoken and redirect
                  localStorage.setItem('token',json.authToken)
                  navigate("/")
    }
    const onChange = (e) => {
        setCredencial({ ...credencial, [e.target.name]: e.target.value });
      }; 

  return (
    <div>
    <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control w-50" id="name" name='name' minLength={5} required
     onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control w-50" id="email" name='email' minLength={5} required onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="Password" className="form-label">Password</label>
    <input type="password" className="form-control w-50" id="Password" name='password' onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Sign Up</button>
</form>
    </div>
  )
}

export default Signup

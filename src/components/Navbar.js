import React,{useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
export default function Navbar() {
  let navigate=useNavigate();
  const handleOnclick=()=>{
    localStorage.removeItem('token');
     navigate('/login')
  }
  let location = useLocation();
  useEffect(() => {
  }, [location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary"data-bs-theme="dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">DailyNotes</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item"> 
          <NavLink className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</NavLink>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control bg-secondary" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-primary mx-4 " type="submit">Search</button>
        </form>
       {!localStorage.getItem('token')? <div>
       <NavLink className="btn btn-primary mx-2" to="/login" role="button">Login</NavLink>
        <NavLink className="btn btn-primary" to="/signup" role="button">Sign Up</NavLink>
        </div>: <button onClick={handleOnclick} className='btn btn-primary'>Logout</button>}
       
    </div>
  </div>
</nav>
 
    </>  

  )
}

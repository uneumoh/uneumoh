import React from "react";
import './components.css';
import Login from './Login';
import { Link } from "react-router-dom";
const HomePage = () =>{

return(
    <>
<div >
<ul className="NavBar">
<li><a><Link to="/">Home</Link></a></li>
<li><a><Link to="/Read">Patients</Link></a></li>
<li><a><Link to="/">Delete Patient</Link></a></li>
</ul>
</div>

<div>
    <Login />
</div>
</>
    )

}
export default HomePage;
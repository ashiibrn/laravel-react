import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import psau_logo from "../assets/user/psau_logo.png";
import bell_icon from "../assets/user/bell_icon.svg";
import message_icon from "../assets/user/message_icon.svg";
import user_icon from "../assets/user/user_icon.svg";

export default function TechLayout(){
    const {user, token, setUser, setToken} = useStateContext();
    if(!token){
        return <Navigate to='/login'/>
    }
    
    const onLogout =  (ev) =>{
        ev.preventDefault();
        axiosClient.get('/logout')
        .then(({}) => {
            setUser(null)
            setToken(null)
            console.log(user);
            console.log(token);
        })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
        }, [])

    return(

        <div className="ultra-container1">
        <nav>
            <div className="nav-logo1">
                <img src={psau_logo} alt="Logo"/>
            </div>
            <div className="nav-title1">
                <p>LABORATORY MAINTENANCE REPORT SYSTEM</p>
            </div>
            <div className="nav-button1">
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={bell_icon} alt="notification"/>
                        <p>3</p>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li>
                        <p className="dropdown-item-text">You have 3 new messages.</p>
                        </li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Message 1: Welcome to our service!</a></li>
                        <li><a className="dropdown-item" href="#">Message 2: Your profile has been updated.</a></li>
                        <li><a className="dropdown-item" href="#">Message 3: Check out our latest features.</a></li>
                    </ul>
                </div>
                <button>
                    <img src={message_icon} alt="message"/>
                    <p>4</p>
                </button>
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={user_icon} alt="profile"/>
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item">{user.name}</Link></li>
                        <li><Link to='/register' className="dropdown-item">Register</Link></li>
                        <li><a className="dropdown-item" href="#" onClick={onLogout}>Logout</a></li>
                    </ul> 
                </div>
            </div>
        </nav>
        <main>
        <Outlet />
        </main>
        </div>


        // <div id="defaultLayout">
        //  <div className="content">
        //     <header>
        //         <div>
        //             Header
        //         </div>
        //         <div>
        //             {user.name}
        //             <a href="#" onClick={onLogout} className="btn-logout"> Logout</a>
        //         </div>
        //     </header>
        //     <main>
        //     <Outlet />
        //     </main>
        //     </div>
        // </div>
    )
}
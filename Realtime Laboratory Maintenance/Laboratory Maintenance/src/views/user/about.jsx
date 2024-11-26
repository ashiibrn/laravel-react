// src/views/user/about.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import dashboard_icon from "../../assets/user/dashboard_icon.svg";
import health_icon from "../../assets/user/health_icon.svg";
import info_icon from "../../assets/user/info_icon.svg";
import location_icon from "../../assets/user/location_icon.svg";
import message_icon from "../../assets/user/message_icon.svg";
import about_icon from "../../assets/user/about_icon.svg";

function About(){
    const navigate = useNavigate(); 
    return (
        <div className='main-flex'>
            <div className="dashboard-route-button1">
                <div className="dashboard-sub-route-button1">
                <button onClick={() => navigate('/user/homepage')} className='notCurrentActiveButton'>
                    <img src={dashboard_icon} alt="dashboard_icon" />
                    <p>DASHBOARD</p>
                </button>
                <button onClick={() => navigate('/user/Health')} className='currentActiveButton'>
                    <img src={health_icon} alt="health_icon" />
                    <p>HEALTH</p>
                </button>
                <button onClick={() => navigate('/user/com_info')} className='notCurrentActiveButton'>
                    <img src={info_icon} alt="info_icon" />
                    <p>INFO</p>
                </button>
                <button onClick={() => navigate('/user/location')} className='notCurrentActiveButton'>
                    <img src={location_icon} alt="location_icon" />
                    <p>LOCATION</p>
                </button>
                
                <button onClick={() => navigate('/user/message')} className='notCurrentActiveButton'>
                    <img src={message_icon} alt="message_icon" />
                    <p>CONTACT</p>
                </button>

                <button onClick={() => navigate('/user/about')} className='notCurrentActiveButton'> 
                    <img src={about_icon} alt="about_icon" />
                    <p>ABOUT</p>
                </button>
                </div>
            </div>
            <div>
                <h1>About Us</h1>
                <p>Welcome to the About page!</p>
            </div>
        </div>
    );
};

export default About;  // Ensure you have a default export here

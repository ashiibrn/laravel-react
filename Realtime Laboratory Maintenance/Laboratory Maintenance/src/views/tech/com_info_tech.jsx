// src/views/tech/com_info_tech.jsx
import React from 'react';
import dashboard_icon from "../../assets/user/dashboard_icon.svg";
import health_icon from "../../assets/user/health_icon.svg";
import info_icon from "../../assets/user/info_icon.svg";
import location_icon from "../../assets/user/location_icon.svg";
import message_icon from "../../assets/user/message_icon.svg";
import report_icon from "../../assets/tech/report_icon.svg";
import about_icon from "../../assets/user/about_icon.svg";
import { useNavigate } from 'react-router-dom';

function ComInfoTech(){
    const navigate = useNavigate();

    return (
        <div className='main-flex'>
            <div className="dashboard-route-button1">
                <div className="dashboard-sub-route-button1">
                <button onClick={() => navigate('/tech/homepage_tech')} className='technotCurrentActiveButton'>
                    <img src={dashboard_icon} alt="dashboard_icon" />
                    <p>DASHBOARD</p>
                </button>
                <button onClick={() => navigate('/tech/health_tech')} className='technotCurrentActiveButton'>
                    <img src={health_icon} alt="health_icon" />
                    <p>HEALTH</p>
                </button>
                <button onClick={() => navigate('/tech/com_info_tech')} className='techcurrentActiveButton'>
                    <img src={info_icon} alt="info_icon" />
                    <p>INFO</p>
                </button>
                <button onClick={() => navigate('/tech/homepage_tech')} className='technotCurrentActiveButton'>
                    <img src={location_icon} alt="location_icon" />
                    <p>LOCATION</p>
                </button>
                <button onClick={() => navigate('/tech/reports_display')} className='technotCurrentActiveButton'>
                    <img src={report_icon} alt="report_icon" />
                    <p>REPORTS</p>
                </button>
                <button onClick={() => navigate('/tech/message_tech')} className='technotCurrentActiveButton'>
                    <img src={message_icon} alt="message_icon" />
                    <p>CONTACT</p>
                </button>
                <button onClick={() => navigate('/tech/about_tech')} className='technotCurrentActiveButton'> 
                    <img src={about_icon} alt="about_icon" />
                    <p>ABOUT</p>
                </button>
                </div>
            </div>
            <div>
                <h1>Com Info Tech</h1>
                <p>This is the Com Info Tech page content.</p>
            </div>
        </div>
    );
};

export default ComInfoTech;  // Ensure this default export is included

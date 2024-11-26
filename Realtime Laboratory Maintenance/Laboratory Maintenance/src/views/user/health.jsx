import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import dashboard_icon from "../../assets/user/dashboard_icon.svg";
import health_icon from "../../assets/user/health_icon.svg";
import info_icon from "../../assets/user/info_icon.svg";
import location_icon from "../../assets/user/location_icon.svg";
import message_icon from "../../assets/user/message_icon.svg";
import about_icon from "../../assets/user/about_icon.svg";
import Health_lab1 from './health/health_lab1.jsx';
import Health_lab2 from './health/health_lab2.jsx';
import Health_lab3 from './health/health_lab3.jsx';
import Health_lab4 from './health/health_lab4.jsx';
import Health_lab5 from './health/health_lab5.jsx';
import Health_lab6 from './health/health_lab6.jsx';
import Report from './health/report.jsx';

function Health() {
    const [activeTab, setActiveTab] = useState('health_lab1');
    const navigate = useNavigate();  // Initialize useNavigate

    // Function to render the content based on the active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'health_lab1':
                return <Health_lab1 />;
            case 'health_lab2':
                return <Health_lab2 />;
            case 'health_lab3':
                return <Health_lab3 />;
            case 'health_lab4':
                return <Health_lab4 />;
            case 'health_lab5':
                return <Health_lab5 />;
            case 'health_lab6':
                return <Health_lab6 />;
            default:
                return <Health_lab1 />;
        }
    };
    
    return (
        <div className="health-container-layout">
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
            <div className="health-tab-container">
                {/* Tab Buttons */}
                <div className="health-tabs">
                    <div>
                        <button
                            className={activeTab === 'health_lab1' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('health_lab1')}
                        >
                            Lab 1
                        </button>
                        <button
                            className={activeTab === 'health_lab2' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('health_lab2')}
                        >
                            Lab 2
                        </button>
                        <button
                            className={activeTab === 'health_lab3' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('health_lab3')}
                        >
                            Lab 3
                        </button>
                        <button
                            className={activeTab === 'health_lab4' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('health_lab4')}
                        >
                            Lab 4
                        </button>
                        <button
                            className={activeTab === 'health_lab5' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('health_lab5')}
                        >
                            Lab 5
                        </button>
                        <button
                            className={activeTab === 'health_lab6' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('health_lab6')}
                        >
                            Lab 6
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="health-tab-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default Health;

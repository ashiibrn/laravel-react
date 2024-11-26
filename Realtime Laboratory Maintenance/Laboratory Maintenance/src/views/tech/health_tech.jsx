import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dashboard_icon from "../../assets/user/dashboard_icon.svg";
import health_icon from "../../assets/user/health_icon.svg";
import info_icon from "../../assets/user/info_icon.svg";
import location_icon from "../../assets/user/location_icon.svg";
import message_icon from "../../assets/user/message_icon.svg";
import report_icon from "../../assets/tech/report_icon.svg";
import about_icon from "../../assets/user/about_icon.svg";
import Health_Tech_lab1 from "./health_tech/health_tech_lab1.jsx";
import Health_Tech_lab2 from "./health_tech/health_tech_lab2.jsx";
import Health_Tech_lab3 from "./health_tech/health_tech_lab3.jsx";
import Health_Tech_lab4 from "./health_tech/health_tech_lab4.jsx";
import Health_Tech_lab5 from "./health_tech/health_tech_lab5.jsx";
import Health_Tech_lab6 from "./health_tech/health_tech_lab6.jsx";

function health_tech(){
    const [activeTab, setActiveTab] = useState('Health_Tech_lab1');
    const navigate = useNavigate();  // Initialize useNavigate

    // Function to render the content based on the active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'Health_Tech_lab1':
                return <Health_Tech_lab1 />;
            case 'Health_Tech_lab2':
                return <Health_Tech_lab2 />;
            case 'Health_Tech_lab3':
                return <Health_Tech_lab3 />;
            case 'Health_Tech_lab4':
                return <Health_Tech_lab4 />;
            case 'Health_Tech_lab5':
                return <Health_Tech_lab5 />;
            case 'Health_Tech_lab6':
                return <Health_Tech_lab6 />;
            default:
                return <Health_Tech_lab1 />;
        }
    };

    return(
        <div className="health-container-layout">
            <div className="dashboard-route-button1">
                <div className="dashboard-sub-route-button1">
                <button onClick={() => navigate('/tech/homepage_tech')} className='technotCurrentActiveButton'>
                    <img src={dashboard_icon} alt="dashboard_icon" />
                    <p>DASHBOARD</p>
                </button>
                <button onClick={() => navigate('/tech/health_tech')} className='techcurrentActiveButton'>
                    <img src={health_icon} alt="health_icon" />
                    <p>HEALTH</p>
                </button>
                <button onClick={() => navigate('/tech/com_info_tech')} className='technotCurrentActiveButton'>
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
            <div className="health-tab-container">
                {/* Tab Buttons */}
                <div className="health-tabs">
                    <div>
                        <button
                            className={activeTab === 'Health_Tech_lab1' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('Health_Tech_lab1')}
                        >
                            Lab 1
                        </button>
                        <button
                            className={activeTab === 'Health_Tech_lab2' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('Health_Tech_lab2')}
                        >
                            Lab 2
                        </button>
                        <button
                            className={activeTab === 'Health_Tech_lab3' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('Health_Tech_lab3')}
                        >
                            Lab 3
                        </button>
                        <button
                            className={activeTab === 'Health_Tech_lab4' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('Health_Tech_lab4')}
                        >
                            Lab 4
                        </button>
                        <button
                            className={activeTab === 'Health_Tech_lab5' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('Health_Tech_lab5')}
                        >
                            Lab 5
                        </button>
                        <button
                            className={activeTab === 'Health_Tech_lab6' ? 'active-tab' : ''}
                            onClick={() => setActiveTab('Health_Tech_lab6')}
                        >
                            Lab 6
                        </button>
                    </div>
                </div>
                <div className="health-tab-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}
export default health_tech;
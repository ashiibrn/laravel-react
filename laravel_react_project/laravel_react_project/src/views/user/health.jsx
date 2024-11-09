import Health_lab1 from './health/health_lab1.jsx';
import Health_lab2 from './health/health_lab2.jsx';
import Health_lab3 from './health/health_lab3.jsx';
import Health_lab4 from './health/health_lab4.jsx';
import Health_lab5 from './health/health_lab5.jsx';
import Health_lab6 from './health/health_lab6.jsx';
import { useState } from 'react';


function health(){
    const [activeTab, setActiveTab] = useState('health_lab1');

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

    return(
        <div className="dashboard1">
        <div className="dashboard-route-button1">
            <div className="dashboard-sub-route-button1">
                <button>
                    <img src={dashboard_icon} alt="dashboard_icon"/>
                    <p>DASHBOARD</p>
                </button>
                <button onClick={() => navigate('/health')}>
                    <img src={health_icon} alt="health_icon"/>
                    <p>HEALTH</p>
                </button>
                <button onClick={() => navigate('/about')}>
                    <img src={info_icon} alt="info_icon"/>
                    <p>INFO</p>
                </button>
                <button onClick={() => navigate('/about')}>
                    <img src={location_icon} alt="location_icon"/>
                    <p>LOCATION</p>
                </button>
                <button onClick={() => navigate('/about')}>
                    <img src={message_icon} alt="message_icon"/>
                    <p>CONTACT</p>
                </button>
                <button onClick={() => navigate('/about')}>
                    <img src={about_icon} alt="about_icon"/>
                    <p>ABOUT</p>
                </button>
            </div>
        <div>
            {/* Tab Buttons */}
            <div className="tabs">
                <button onClick={() => setActiveTab('health_lab1')}>Lab 1</button>
                <button onClick={() => setActiveTab('health_lab2')}>Lab 2</button>
                <button onClick={() => setActiveTab('health_lab3')}>Lab 3</button>
                <button onClick={() => setActiveTab('health_lab4')}>Lab 4</button>
                <button onClick={() => setActiveTab('health_lab5')}>Lab 5</button>
                <button onClick={() => setActiveTab('health_lab6')}>Lab 6</button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {renderContent()}
            </div>
        </div>
        </div>
        </div>
    )
}
export default health;
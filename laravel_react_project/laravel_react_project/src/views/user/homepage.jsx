import dashboard_icon from "../../assets/user/dashboard_icon.svg";
import health_icon from "../../assets/user/health_icon.svg";
import info_icon from "../../assets/user/info_icon.svg";
import location_icon from "../../assets/user/location_icon.svg";
import message_icon from "../../assets/user/message_icon.svg";
import about_icon from "../../assets/user/about_icon.svg";
import alert_icon from "../../assets/user/alert_icon.svg";

function homepage(){
    const navigate = useNavigate();

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
            <section className="dashboard-sub-route-button2">
                <div className="dashboard-sub-route-button2-partition">
                    <button className="dashboard-whole-button1">
                        <div className="dashboard-whole-button1-label1">
                            <img src={health_icon} alt=""/>
                            <p>COMPUTER HEALTH</p>
                        </div>
                        <div className="dashboard-whole-button1-label2">
                            <div className="dashboard-first-button-sub1">
                                <p>13</p>
                                <div>
                                    <img src={alert_icon} alt=""/>
                                    <p>issue</p>
                                </div>
                            </div>
                            <hr/>
                            <div className="dashboard-second-button-sub1">
                                <div className="dashboard-second-button-sub2">
                                    <p>5</p>
                                    <p>hardware</p>
                                </div>
                                <div className="dashboard-second-button-sub2">
                                    <p>8</p>
                                    <p>software</p>
                                </div>
                            </div>
                        </div>
                    </button>
                    <button className="dashboard-half-button1">
                        <div className="dashboard-whole-button1-label1">
                            <img src={info_icon} alt=""/>
                            <p>COMPUTER INFORMATION</p>
                        </div>
                        <div className="dashboard-whole-button2-label2">
                            <p>72</p>
                            <p>computers</p>
                        </div>
                    </button>
                    <button className="dashboard-half-button1">
                        <div className="dashboard-whole-button1-label1">
                            <img src={location_icon} alt=""/>
                            <p>ROUTER</p>
                        </div>
                        <div className="dashboard-whole-button2-label2">
                            <p>3</p>
                            <p>locations</p>
                        </div>
                    </button>
                </div>
                <div className="dashboard-sub-route-button2-partition">
                    <button className="dashboard-half-button1-hidden">
                        <div className="dashboard-whole-button1-label1">
                            <img src={message_icon} alt=""/>
                            <p>CONTACT</p>
                        </div>
                        <div>
                            <p>message technician on duty</p>
                        </div>
                    </button>
                    <button className="dashboard-half-button1">
                        <div className="dashboard-whole-button1-label1">
                            <img src={message_icon} alt=""/>
                            <p>CONTACT</p>
                        </div>
                        <div className="dashboard-half-button1-label3">
                            <p>Message technician on duty.</p>
                        </div>
                    </button>
                    <button className="dashboard-whole-button1">
                        <div className="dashboard-whole-button1-label1">
                            <img src={about_icon} alt=""/>
                            <p>ABOUT</p>
                        </div>
                        <div className="dashboard-half-button1-label3">
                            <p>"Computers are powerful tools- <br/>when well-maintained, they <br/> empower to achieve the impossible."</p>
                        </div>
                    </button>
                </div>
            </section>
        </div>
    </div>
    )
}

export default homepage;
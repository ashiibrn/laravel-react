import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import psau_logo from "../assets/user/psau_logo.png";
import bell_icon from "../assets/user/bell_icon.svg";
import message_icon from "../assets/user/message_icon.svg";
import user_icon from "../assets/user/user_icon.svg";
import axiosClient from "../axiosClient";

export default function TechLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    const [reports, setReports] = useState([]);
    const [message, setMessage] = useState([]);
    const navigate = useNavigate();

    // If there's no token, redirect to login page
    if (!token) {
        return <Navigate to='/login' />;
    }

    const onLogout = () => {
        axiosClient.post('/logout')
            .then(() => {
                setUser(null);
                setToken(null);
                localStorage.removeItem("ACCESS_TOKEN");
                localStorage.removeItem("REFRESH_TOKEN");
                window.location.href = '/login';
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    };

    useEffect(() => {
        if (!user) {
            axiosClient.get('/user')
                .then(({ data }) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error('Failed to fetch user data:', error);
                });
        }
    }, [user, setUser]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axiosClient.get('/reports');
                setReports(response.data);
            } catch (error) {
                console.error('There was an error fetching the reports!', error);
            }
        };

        fetchReports();
    }, []);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axiosClient.get('/messages');
                setMessage(response.data);
            } catch (error) {
                console.error('There was an error fetching the messages!', error);
            }
        };

        fetchMessage();
    }, []);

    return (
        <div className="ultra-container1">
            <nav className="nav_tech">
                <div className="nav-logo1">
                    <img onClick={() => navigate('/tech/homepage_tech')} src={psau_logo} alt="Logo" />
                </div>
                <div className="nav-title1">
                    <p>LABORATORY MAINTENANCE REPORT SYSTEM</p>
                </div>
                <div className="nav-button1">
                    {/* Notification Dropdown */}
                    <div className="dropdown">
                        <button className="btn dropdown-toggle tech_layout_button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={bell_icon} alt="notification" />
                            <p>{reports.length}</p> {/* Show number of notifications */}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <p className="dropdown-item-text">
                                    {reports.length > 0
                                        ? `You have ${reports.length} new notifications.`
                                        : "No new notifications."}
                                </p>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            {reports.length === 0 ? (
                                <li><span className="dropdown-item">No Notifications</span></li>
                            ) : (
                                reports.map((report) => (
                                    <li key={report.id}>
                                        <a className="dropdown-item" href="#" onClick={() => navigate('/tech/reports_display')}>
                                            {`${report.issue_type} issue reported in ${report.laboratory}.`}
                                        </a>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    {/* Message and User Profile */}
                    <button onClick={() => navigate('tech/message_tech')} className="tech_layout_button">
                        <img src={message_icon} alt="message" />
                        <p>{message.length}</p>
                    </button>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle tech_layout_button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={user_icon} alt="profile" />
                        </button>
                        <ul className="dropdown-menu">
                            <li><span className="dropdown-item">{user?.name || "Loading..."}</span></li>
                            <li><a className="dropdown-item" href="#" onClick={onLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main>
                <Outlet /> {/* Outlet will render child route components here */}
            </main>
        </div>
    );
}

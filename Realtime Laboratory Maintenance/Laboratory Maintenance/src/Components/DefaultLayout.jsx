import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import psau_logo from "../assets/user/psau_logo.png";
import bell_icon from "../assets/user/bell_icon.svg";
import message_icon from "../assets/user/message_icon.svg";
import user_icon from "../assets/user/user_icon.svg";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();
    const [message, setMesssage] = useState([]);

    // Redirect to login if no token
    if (!token) {
        return <Navigate to='/login' />;
    }
    const navigate = useNavigate();
    // Logout function
    const onLogout = () => {
        axiosClient.post('/logout')
            .then(() => {
                setUser(null);
                setToken(null);
                localStorage.removeItem("ACCESS_TOKEN");
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
        const fetchMessage = async () => {
            try {
                const response = await axiosClient.get('/messages');
                setMesssage(response.data);
            } catch (error) {
                console.error('There was an error fetching the reports!', error);
            }
        };

        fetchMessage();
    }, []);

    return (
        <div className="ultra-container1">
            <nav className="nav_user">
                <div className="nav-logo1">
                    <img onClick={() => navigate('/user/homepage')} src={psau_logo} alt="Logo" />
                </div>
                <div className="nav-title1">
                    <p>LABORATORY MAINTENANCE REPORT SYSTEM</p>
                </div>
                <div className="nav-button1">
                    <button onClick={() => navigate('/user/message')} className="default_layout_buttons">
                        <img src={message_icon} alt="message" />
                        <p>{message.length}</p> {/* Placeholder count */}
                    </button>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle default_layout_buttons" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={user_icon} alt="profile" />
                        </button>
                        <ul className="dropdown-menu">
                            <li><span className="dropdown-item-text">{user?.name || "User"}</span></li> {/* Display logged-in user's name */}
                            <li><a className="dropdown-item" href="#" onClick={onLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

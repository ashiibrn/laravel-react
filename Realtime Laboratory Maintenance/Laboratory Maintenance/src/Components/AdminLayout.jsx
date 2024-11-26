import axios from "axios";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import psau_logo from "../assets/user/psau_logo.png";
import bell_icon from "../assets/user/bell_icon.svg";
import message_icon from "../assets/user/message_icon.svg";
import user_icon from "../assets/user/user_icon.svg";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();

    // Redirect to login if no token
    if (!token) {
        return <Navigate to='/login' />;
    }

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

    return (
        <div className="ultra-container1">
            <nav className="nav_tech">
                <div className="nav-logo1">
                    <img src={psau_logo} alt="Logo" />
                </div>
                <div className="nav-title1">
                    <p>LABORATORY MAINTENANCE REPORT SYSTEM</p>
                </div>
                <div className="nav-button1">
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={bell_icon} alt="notification" />
                            <p>3</p> {/* Placeholder count */}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><p className="dropdown-item-text">You have 3 new messages.</p></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Message 1: Welcome!</a></li>
                            <li><a className="dropdown-item" href="#">Message 2: Profile updated.</a></li>
                            <li><a className="dropdown-item" href="#">Message 3: New features available.</a></li>
                        </ul>
                    </div>
                    <button>
                        <img src={message_icon} alt="message" />
                        <p>4</p> {/* Placeholder count */}
                    </button>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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

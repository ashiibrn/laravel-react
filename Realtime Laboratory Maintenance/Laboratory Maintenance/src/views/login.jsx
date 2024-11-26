import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import psau_logo from "../assets/user/psau_logo.png";
import left_icon from "../assets/tech/arrow_left_icon.svg";
import right_icon from "../assets/tech/arrow_right_icon.svg";
import mail_icon from "../assets/user/mail_icon.svg";   
import lock_icon from "../assets/user/lock_icon.svg";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const { setUser, setToken, setPosition } = useStateContext();
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const Submit = async (ev) => {
        ev.preventDefault();  // Prevents the default form submission behavior
        setLoading(true);
        setError(null);
    
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        // Input validation
        if (!payload.email || !payload.password) {
            setLoading(false);
            setError("Email and password are required.");
            return;
        }

        try {
            const { data } = await axiosClient.post("/auth/login", payload);  // POST request

            // Store the token and user data in localStorage
            localStorage.setItem("auth_token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Update context with user data
            setUser(data.user);
            setToken(data.token);
            setPosition(data.user.position);

            // Redirect based on user position (role)
            if (data.user.position === "faculty") {
                navigate("/user/homepage");
            } else if (data.user.position === "technician") {
                navigate("/tech/homepage");
            } else if (data.user.position === "admin") {
                navigate("/admin/homepage");
            } else {
                setError("Invalid role. Please contact support.");
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            if (err.response) {
                setError(
                    err.response.status === 422
                        ? "Invalid credentials. Please try again."
                        : "Something went wrong. Please try again later."
                );
            } else {
                setError("Network error. Please check your connection.");
            }
        }
    };
    
    return (
        <div className="login-container1">
            <div className="login-main-container1">
                <div className="login-caption-box1">
                        <p className="h-1">Realtime Maintenance Report System</p>
                        <p className="tl-1">Maximizing Uptime, <br />
                        Minimizing Disruptions in Computer Labs</p>
                </div>
                <form onSubmit={Submit} className="login-form-group1">
                    <div className="login-input1">
                        <img src={mail_icon} alt="mail" />
                        <input ref={emailRef} type="email" placeholder="User" required />
                    </div>
                    <div className="login-input1">
                        <img src={lock_icon} alt="lock" />
                        <input ref={passwordRef} type="password" placeholder="Password" required />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <hr />
                    <button type="submit" className="btn1-login" disabled={loading}>
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>
            </div>
            <div className="login-main-container2">
                <div className="login-logo">
                    <img src={psau_logo} alt="logo" height="350" width="350" />
                </div>
                <div className="login-caption-box2">
                    <p>Ensuring a Smooth<br/> 
                    Learning Experience,<br/> 
                    Optimizing Lab Effeciency</p>
                    <button className="button2">
                        <img src={left_icon} alt="left-button" />
                    </button>
                    <button className="button2">
                        <img src={right_icon} alt="right-button" />
                    </button>
                </div>
            </div>
        </div>
    );
}

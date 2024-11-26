import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient"; // Make sure this is properly configured
import { useStateContext } from "../contexts/contextprovider";
import dcs_logo from '../assets/tech/dcs_logo.png';
import arrow_right from '../assets/tech/arrow_right_icon.svg';
import arrow_left from '../assets/tech/arrow_left_icon.svg';

export default function Register() {
    const nameRef = useRef();
    const idNumberRef = useRef();
    const positionRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const Submit = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        setError(null);

        // Validate fields
        const payload = {
            name: nameRef.current.value.trim(),
            id_number: idNumberRef.current.value.trim(),
            position: positionRef.current.value,
            email: emailRef.current.value.trim(),
            password: passwordRef.current.value.trim(),
        };

        if (!payload.name || !payload.id_number || !payload.email || !payload.password) {
            setLoading(false);
            setError("Please fill in all the fields.");
            return;
        }

        try {
            // Register user via API
            const { data } = await axiosClient.post("/auth/register", payload);

            setUser(data.user);
            setToken(data.token);

            // Redirect to login after successful registration
            setLoading(false);
            navigate("/login");
        } catch (err) {
            setLoading(false);
            if (err.response && err.response.status === 422) {
                setError("Registration failed. Please check the fields and try again.");
            } else if (err.response && err.response.status === 500) {
                setError("Server error. Please try again later.");
            }
        }
    };

    return (
        <div className="ultra_container1">
            <section className="section-one">
                <div className="main_container1">
                    <div className="logo-pic">
                        <img src={dcs_logo} alt="logo" height="550" width="550" className="arrow-left" />
                    </div>
                    <div className="caption1">
                        <p>Ensuring a Smooth<br />
                            Learning Experience,<br />
                            Optimizing Lab Efficiency</p>
                        <button className="button2">
                            <img src={arrow_left} alt="left-button" />
                        </button>
                        <button className="button2">
                            <img src={arrow_right} alt="right-button" />
                        </button>
                    </div>
                </div>
            </section>
            <section className="section-two">
                <div className="main_container2">
                    <div className="heading2">
                        <h6>Laboratory<br />
                            Maintenance</h6>
                        <h5>Registration</h5>
                    </div>
                    <form onSubmit={Submit} className="registration2">
                        <input ref={nameRef} type="text" placeholder="Name" required />
                        <input ref={idNumberRef} type="text" placeholder="ID Number" required />
                        <div className="selection2">
                            <label htmlFor="role">Choose a role:</label>
                            <select ref={positionRef} id="role" name="role" required>
                                <option value="faculty">Faculty</option>
                                <option value="technician">Technician</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <input ref={emailRef} type="email" placeholder="Email" required />
                        <input ref={passwordRef} type="password" placeholder="Password" required />
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

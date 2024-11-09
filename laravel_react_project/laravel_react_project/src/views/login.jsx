    import axios from "axios";
    import { useRef } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import axiosClient from "../axiosClient";
    import { useStateContext } from "../contexts/contextprovider";
    import psau_logo from "../assets/user/psau_logo.png";
    import left_icon from "../assets/tech/arrow_left_icon.svg";
    import right_icon from "../assets/tech/arrow_right_icon.svg";
    import mail_icon from "../assets/user/mail_icon.svg";   
    import lock_icon from "../assets/user/lock_icon.svg";

    export default function login(){

        const emailRef = useRef();
        const passwordRef = useRef();
        const navigate = useNavigate();

        const {setUser, setToken, setPosition} = useStateContext();

        const Submit =  (ev) =>{
            ev.preventDefault();
            const payload = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }
            axiosClient.post("/login",payload).then(({data})=>{
                setUser(data.user);
                setToken(data.token);
                setPosition(data.user.position);
                console.log(data.user.position);

                if (data.user.position === "student") {
                    navigate("/");
                } else if (data.user.position === "faculty") {
                    navigate("/");
                }
        }).catch(err => {
            const response = err.response;
            if(response && response.status === 422){
                console.log(response.data.errors);
            }
        });
        }

        return(

            <div className="login-container1">
            <section>
                <div className="login-main-container1">
                    <div className="login-caption-box1">
                        <p>
                            <span className="h-1">Realtime</span> <br/>
                            <span className="h-2">Maintenance Report System</span> <br/>
                            <span className="tl-1">Maximizing Uptime, <br/>
                            Minimizing Disruptions in Computer Labs</span> 
                        </p>
                    </div>
                    <form onSubmit={Submit} className="login-form-group1">
                        <div className="login-input1">
                            <img src={mail_icon} alt="mail"/>
                            <input ref={emailRef} type="text" placeholder="User"/>
                        </div>
                        <div className="login-input1">
                            <img src={lock_icon} alt="lock"/>
                            <input ref={passwordRef} type="password" placeholder="Password"/>
                        </div>
                        <hr/>
                        <button>Log In</button>
                    </form>
                </div>
            </section>
            <section>
                <div className="login-main-container2">
                    <div className="login-logo-box2">
                        <img src={psau_logo} alt="logo" height="550" width="550"/>
                    </div>
                    <div className="login-caption-box2">
                        <p>Ensuring a Smooth<br/> 
                        Learning Experience,<br/> 
                        Optimizing Lab Effeciency</p>
                        <button>
                            <img src={left_icon} alt="left-button"/>
                        </button>
                        <button>
                            <img src={right_icon} alt="right-button"/>
                        </button>
                    </div>
                </div>
            </section>
        </div>

            // <div className="login-signup-form animated fadeinDown">
            //     <div className="form">
            //         <h1 className="title">
            //             Login To Your Account
            //         </h1>
            //         <form onSubmit={Submit}>
            //         <input ref={emailRef} type="email" placeholder="Email" />
            //             <input ref={passwordRef} type="password" placeholder="Password" />
            //             <button className="btn btn-block">Login</button>
            //             <p className="message">
            //                 Not Registered? <Link to= '/register'>Create a new account</Link>
            //             </p>
            //         </form>
            //     </div>
            // </div>
        )
    }
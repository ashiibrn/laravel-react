import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import dcs_logo from '../assets/tech/dcs_logo.png';
import arrow_right from '../assets/tech/arrow_right_icon.svg';
import arrow_left from '../assets/tech/arrow_left_icon.svg';

export default function register(){

    const nameRef = useRef();
    const id_number = useRef();
    const positionRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            id_number: id_number.current.value,
            position: positionRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/register",payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
    }).catch(err => {
        const response = err.response;
        if(response && response.status === 422){
            console.log(response.data.errors);
        }
    });
}

    return(
        <div className="ultra_container">
                <section>
                    <div className="main_container1">
                        <div className="logo-pic">
                            <img src={dcs_logo} alt="logo" height="550" width="550"/>
                        </div>
                        <div className="caption1">
                            <p>Ensuring a Smooth<br/>
                            Learning Experience,<br/> 
                            Optimizing Lab Effeciency</p>
                            <button className="button2">
                                <img src={arrow_left} alt="left-button"/>
                            </button>
                            <button className="button2">
                                <img src={arrow_right} alt="right-button"/>
                            </button>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="main_container2">
                        <div className="heading2">
                            <h6>Laboratory<br/> 
                            Maintenance</h6>
                            <h5>Registration</h5>
                        </div>
                        <form onSubmit={Submit} className="registration2">
                            <input ref={nameRef} type="text" placeholder="Name"/>
                            <input ref={id_number} type="text" placeholder="ID Number"/>
                                <div className="selection2">
                                    <label htmlFor="role">Choose a role:</label>
                                    <select ref={positionRef} id="role" name="role">
                                        <option value="faculty">Faculty</option>
                                        <option value="student">Student</option>
                                    </select>
                                </div>
                            <input ref={emailRef} type="text" placeholder="User"/>
                            <input ref={passwordRef} type="password" placeholder="Password"/>
                            <button>Register</button>
                        </form>
                    </div>
                </section>
            </div>

        // <div>
        //     <div>
        //         <h1>
        //             Create A New Account
        //         </h1>
        //         <form onSubmit={Submit}>
        //             <input ref={nameRef} type="name" placeholder="Name" />
        //             <input ref={id_number} type="text" placeholder="ID Number"/>
        //             <select ref={positionRef}>
        //                 <option value="">Select Position</option>
        //                 <option value="student">Student</option>
        //                 <option value="faculty">Faculty</option>
        //             </select>
        //             <input ref={emailRef} type="email" placeholder="Email" />
        //             <input ref={passwordRef} type="password" placeholder="Password" />
        //             <button className="btn btn-block">Register</button>
        //         </form>
        //     </div>
        // </div>
    )
}
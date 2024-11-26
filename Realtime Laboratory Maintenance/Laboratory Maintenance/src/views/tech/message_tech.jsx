import React, { useState, useEffect } from "react";
import axiosClient from "../../axiosClient.js";
import user_icon from "../../assets/user/user_icon.svg";
import dashboard_icon from "../../assets/user/dashboard_icon.svg";
import health_icon from "../../assets/user/health_icon.svg";
import info_icon from "../../assets/user/info_icon.svg";
import location_icon from "../../assets/user/location_icon.svg";
import message_icon from "../../assets/user/message_icon.svg";
import report_icon from "../../assets/tech/report_icon.svg";
import about_icon from "../../assets/user/about_icon.svg";
import { useNavigate } from 'react-router-dom';

function Message() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch messages from the database
    axiosClient.get("/messages").then((response) => {
      setMessages(response.data);
    });
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    // Save the message to the database
    axiosClient
      .post("/messages", { sender: "message_tech", message: newMessage })
      .then((response) => {
        setMessages([...messages, response.data]);
        setNewMessage("");
      });
  };

  return (
    <div className="main-flex">
      <div className="dashboard-route-button1">
                <div className="dashboard-sub-route-button1">
                <button onClick={() => navigate('/tech/homepage_tech')} className='technotCurrentActiveButton'>
                    <img src={dashboard_icon} alt="dashboard_icon" />
                    <p>DASHBOARD</p>
                </button>
                <button onClick={() => navigate('/tech/health_tech')} className='technotCurrentActiveButton'>
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
                <button onClick={() => navigate('/tech/message_tech')} className='techcurrentActiveButton'>
                    <img src={message_icon} alt="message_icon" />
                    <p>CONTACT</p>
                </button>
                <button onClick={() => navigate('/tech/about_tech')} className='technotCurrentActiveButton'> 
                    <img src={about_icon} alt="about_icon" />
                    <p>ABOUT</p>
                </button>
                </div>
            </div>
    <div id="message-main-container">
      <div id="message-sub-container">
        {messages.map((msg) => (
          <div
            className="message-context-container"
            key={msg.id}
            style={{
              textAlign: msg.sender === "message_tech" ? "right" : "left",
            }}
          >
            <p className="message-sender-name">{msg.sender === "message_tech" ? "Technician" : "Faculty"}</p>
            <div
            className="message-semidisplay"
              style={{
                flexDirection: msg.sender === "message_tech" ? "row-reverse" : "row ",
              }}
            >
              <img src={user_icon} alt="profile_pic" />
              <div 
              className="message-primary-container"
              style={{
                backgroundColor: msg.sender === "message_tech" ? "#042B54" : "#0A5F2C",
              }}>
                <p id="message_display" style={{color: "#FFFFFF"}}>{msg.message}</p>  
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <textarea
          name="message"
          id="message_input"
          className="message_input_textbox"
          placeholder="Write your message here."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
    </div>
  );
}

export default Message;

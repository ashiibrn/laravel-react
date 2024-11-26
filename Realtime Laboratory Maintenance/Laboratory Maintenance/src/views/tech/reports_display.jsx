import React, { useEffect, useState } from 'react';
import axiosClient from '../../axiosClient.js';
import dashboard_icon from "../../assets/user/dashboard_icon.svg";
import health_icon from "../../assets/user/health_icon.svg";
import info_icon from "../../assets/user/info_icon.svg";
import location_icon from "../../assets/user/location_icon.svg";
import message_icon from "../../assets/user/message_icon.svg";
import report_icon from "../../assets/tech/report_icon.svg";
import about_icon from "../../assets/user/about_icon.svg";
import { useNavigate } from 'react-router-dom';

function Reports_Display() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true); // To handle loading state
    const [error, setError] = useState(null); // To handle errors
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axiosClient.get('/reports'); // Fetch data from API
                setReports(response.data); // Save reports in state
                setLoading(false); // Stop loading
            } catch (err) {
                setError('Failed to fetch reports. Please try again later.');
                setLoading(false); // Stop loading
            }
        };

        fetchReports(); // Call the fetch function
    }, []);

    return (
        <div className='main-flex'>
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
                <button onClick={() => navigate('/tech/reports_display')} className='techcurrentActiveButton'>
                    <img src={report_icon} alt="report_icon" />
                    <p>REPORTS</p>
                </button>
                <button onClick={() => navigate('/tech/message_tech')} className='technotCurrentActiveButton'>
                    <img src={message_icon} alt="message_icon" />
                    <p>CONTACT</p>
                </button>
                <button onClick={() => navigate('/tech/about_tech')} className='technotCurrentActiveButton'> 
                    <img src={about_icon} alt="about_icon" />
                    <p>ABOUT</p>
                </button>
                </div>
            </div>
            <div>
                <h1>Submitted Reports</h1>
                {loading ? ( // Show loading message while data is being fetched
                    <p>Loading reports...</p>
                ) : error ? ( // Show error message if an error occurred
                    <p style={{ color: 'red' }}>{error}</p>
                ) : reports.length === 0 ? ( // If no reports are available
                    <p>No reports available</p>
                ) : (
                    // Display each report
                    reports.map((report) => (
                        <div key={report.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                            <p><strong>Laboratory:</strong> {report.laboratory}</p>
                            <p><strong>PC Number:</strong> {report.pcnumber}</p>
                            <p><strong>Issue Type:</strong> {report.issue_type}</p>
                            <p><strong>Specific Issue:</strong> {report.specific_issue}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Reports_Display;

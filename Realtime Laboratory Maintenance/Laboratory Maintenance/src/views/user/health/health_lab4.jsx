import { useState, useEffect } from "react";
import axiosClient from "../../../axiosClient";
import monitor from "../../../assets/tech/monitor.svg";
import hardware from "../../../assets/tech/hardware.svg";
import software from "../../../assets/tech/software.svg";
import network from "../../../assets/tech/network.svg";

function HealthLab4() {
    const [dropAreasLeft, setDropAreasLeft] = useState(Array(12).fill([])); // 4x4 grid
    const [dropAreasRight, setDropAreasRight] = useState(Array(16).fill([])); // 3x4 grid
    const [showWidgetModal, setShowWidgetModal] = useState(false); // Widget Details Modal
    const [showMonitorModal, setShowMonitorModal] = useState(false); // Issue Details Modal
    const [selectedWidget, setSelectedWidget] = useState(null);
    const [dropAreaIndex, setDropAreaIndex] = useState(null); // Track drop area index
    const [side, setSide] = useState(null); // Track side for form submission
    const [savedWidgets, setSavedWidgets] = useState(new Set());
    const [laboratory, setLaboratory] = useState("Lab 1");
    const [pcnumber, setPcnumber] = useState("");
    const [issueType, setIssueType] = useState("Hardware Issue");
    const [specific_Issue, setSpecific_Issue] = useState('');
    
    const [issueCategory, setIssueCategory] = useState("");
    const [specificIssue, setSpecificIssue] = useState("");
    
    useEffect(() => {
        async function fetchWidgetData() {
            try {
                const response = await axiosClient.get("/widgets");
                const data = response.data;

                const left = Array(16).fill([]);
                const right = Array(12).fill([]);

                data.forEach(widget => {
                    if (widget.drop_area_index && widget.widget_type) {
                        if (widget.side === "left") {
                            left[widget.drop_area_index - 1] = [...left[widget.drop_area_index - 1], widget.widget_type];
                        } else if (widget.side === "right") {
                            right[widget.drop_area_index - 1] = [...right[widget.drop_area_index - 1], widget.widget_type];
                        }
                    }
                });

                setDropAreasLeft(left);
                setDropAreasRight(right);
            } catch (error) {
                console.error("Error fetching widget data:", error);
            }
        }

        fetchWidgetData();
    }, []);

    function closeModals() {
        setShowWidgetModal(false);
        setShowMonitorModal(false);
        setLaboratory("Lab 1");
        setPcnumber("");
        setIssueType("Hardware Issue");
        setSpecific_Issue("");
    }

    function handleWidgetClick(widget, index, side) {
        setSelectedWidget(widget);
        setDropAreaIndex(index + 1); // Update the dropAreaIndex for the clicked widget
        setSide(side); // Update the side (left or right)

    
        async function fetchIssueData() {
            try {
                const response = await axiosClient.get(`/widget/${widget}/issues`);
                console.log("Fetched Issues:", response.data);  // Inspect the response here
        
                const issues = response.data;
        
                if (issues.length > 0) {
                    setIssueCategory(issues[0].issue_category);
                    setSpecificIssue(issues[0].specific_issue);
                } else {
                    setIssueCategory("No issues found");
                    setSpecificIssue("No specific issue details available");
                }
        
                setShowWidgetModal(true);  // Show the widget modal
            } catch (error) {
                console.error("Error fetching issue data:", error);
            }
        }
    
        fetchIssueData(); // Fetch data when widget is clicked
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        async function submitReport() {
            try {
                const response = await axiosClient.post('/reports', {
                    laboratory,
                    pcnumber,
                    issue_type: issueType,
                    specific_issue: specific_Issue,
                });
    
                if (response.status === 201) {
                    alert('Report submitted successfully');
                    setLaboratory('');
                    setPcnumber('');
                    setIssueType('');
                    setSpecific_Issue('');
                    closeModals();
                }
            } catch (error) {
                console.error('There was an error!', error);
                alert('Error submitting the report');
            }
        }

        submitReport();
    }

    function renderWidgetSVG(widgetType) {
        switch (widgetType) {
            case "Monitor":
                return <img src={monitor} alt="Monitor" style={{ width: '40px' }} />;
            case "Hardware Issue":
                return <img src={hardware} alt="Hardware Issue" />;
            case "Software Issue":
                return <img src={software} alt="Software Issue" />;
            case "Network Issue":
                return <img src={network} alt="Network Issue" />;
            default:
                return null;
        }
    }

    return (
        <div className="container mt-4">
            {/* Droppable Areas and Widgets */}
            <div className="row">
                <div className="col-4">
                    <div className="drop-area-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                        {dropAreasLeft.map((widgets, index) => (
                            <div
                                className="drop-area border p-2 d-flex flex-column"
                                key={index}
                                style={{ minHeight: "100px" }}
                            >
                                {widgets.includes("Monitor") && (
                                    <div className="monitor-widget d-flex align-items-center justify-content-center mb-2">
                                        {renderWidgetSVG("Monitor")}
                                    </div>
                                )}
                                <div className="other-widgets d-flex">
                                    {widgets.filter(widget => widget !== "Monitor").map((widget, i) => (
                                        <div
                                            key={i}
                                            className="d-flex align-items-center justify-content-center"
                                            onClick={() => handleWidgetClick(widget, index, "left")}
                                        >
                                            {renderWidgetSVG(widget)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-4">
                    <div className="drop-area-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                        {dropAreasRight.map((widgets, index) => (
                            <div
                                className="drop-area border p-2 d-flex flex-column"
                                key={index}
                                style={{ minHeight: "100px" }}
                            >
                                {widgets.includes("Monitor") && (
                                    <div className="monitor-widget d-flex align-items-center justify-content-center mb-2" onClick={() => setShowMonitorModal(true)}>
                                        {renderWidgetSVG("Monitor")}
                                    </div>
                                )}
                                <div className="other-widgets d-flex">
                                    {widgets.filter(widget => widget !== "Monitor").map((widget, i) => (
                                        <div
                                            key={i}
                                            className="d-flex align-items-center justify-content-center"
                                            onClick={() => handleWidgetClick(widget, index, "right")}
                                        >
                                            {renderWidgetSVG(widget)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Widget Modal */}
            <div className={`modal fade ${showWidgetModal ? "show" : ""}`} style={{ display: showWidgetModal ? "block" : "none" }} id="widgetModal" tabIndex="-1" aria-labelledby="widgetModalLabel" aria-hidden={!showWidgetModal}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="widgetModalLabel">{selectedWidget}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModals}></button>
                        </div>
                        <div className="modal-body">
                            <p>Details for {selectedWidget} widget.</p>
                            <p>Category Issue: {issueCategory}</p>
                            <p>Specific Issue: {specificIssue}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Monitor Modal with Form */}
            <div className={`modal fade ${showMonitorModal ? "show" : ""}`} style={{ display: showMonitorModal ? "block" : "none" }} id="monitorModal" tabIndex="-1" aria-labelledby="monitorModalLabel" aria-hidden={!showMonitorModal}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="monitorModalLabel">Monitor Issue Report</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowMonitorModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="report_lab_input">Laboratory:</label>
                                    <select
                                        name="Lab Input"
                                        id="report_lab_input"
                                        value={laboratory}
                                        onChange={(e) => setLaboratory(e.target.value)}
                                    >
                                        <option value="Lab 1">Lab 1</option>
                                        <option value="Lab 2">Lab 2</option>
                                        <option value="Lab 3">Lab 3</option>
                                        <option value="Lab 4">Lab 4</option>
                                        <option value="Lab 5">Lab 5</option>
                                        <option value="Lab 6">Lab 6</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pcnumber">PC Number:</label>
                                    <input
                                        type="text"
                                        id="pcnumber"
                                        value={pcnumber}
                                        onChange={(e) => setPcnumber(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="issueType">Type Issue:</label>
                                    <select
                                        name="Issue Type"
                                        id="issueType"
                                        value={issueType}
                                        onChange={(e) => setIssueType(e.target.value)}
                                    >
                                        <option value="Hardware Issue">Hardware Issue</option>
                                        <option value="Software Issue">Software Issue</option>
                                        <option value="Network Issue">Network Issue</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="specIssue">Specific Issue:</label>
                                    <input
                                        type="text"
                                        id="specIssue"
                                        value={specific_Issue}
                                        onChange={(e) => setSpecific_Issue(e.target.value)}
                                    />
                                </div>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HealthLab4;

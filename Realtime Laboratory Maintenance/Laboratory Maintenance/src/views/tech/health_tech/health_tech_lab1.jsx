import { useState, useEffect } from "react";
import axiosClient from "../../../axiosClient";
import monitor from "../../../assets/tech/monitor.svg";
import hardware from "../../../assets/tech/hardware.svg";
import software from "../../../assets/tech/software.svg";
import network from "../../../assets/tech/network.svg";

function health_tech_lab1() {
    const [dropAreasLeft, setDropAreasLeft] = useState(Array(16).fill([])); // 4x4 grid
    const [dropAreasRight, setDropAreasRight] = useState(Array(12).fill([])); // 3x4 grid
    const [showWidgetModal, setShowWidgetModal] = useState(false); // Widget Details Modal
    const [showIssueModal, setShowIssueModal] = useState(false); // Issue Details Modal
    const [selectedWidget, setSelectedWidget] = useState(null);
    const [dropAreaIndex, setDropAreaIndex] = useState(null); // Track drop area index
    const [side, setSide] = useState(null); // Track side for form submission
    const [savedWidgets, setSavedWidgets] = useState(new Set());

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

    const isWidgetAlreadyDropped = (index, side, widgetType) => {
        return side === "left"
            ? dropAreasLeft[index].includes(widgetType)
            : dropAreasRight[index].includes(widgetType);
    };

    function handleOnDrag(e, widgetType) {
        e.dataTransfer.setData("widgetType", widgetType);
    }

    function handleOnDrop(e, index, side) {
        e.preventDefault();
        const widgetType = e.dataTransfer.getData("widgetType");

        if (!hasMonitor(index, side)) {
            if (widgetType !== "Monitor") {
                console.log("Please drop a Monitor first before dropping other widgets.");
                return; // Exit early if no monitor is placed
            }
        }

        if (!isWidgetAlreadyDropped(index, side, widgetType)) {
            if (widgetType === "Monitor" || hasMonitor(index, side)) {
                if (side === "left") {
                    setDropAreasLeft((prev) => {
                        const newAreas = [...prev];
                        newAreas[index] = [...newAreas[index], widgetType];
                        return newAreas;
                    });
                } else {
                    setDropAreasRight((prev) => {
                        const newAreas = [...prev];
                        newAreas[index] = [...newAreas[index], widgetType];
                        return newAreas;
                    });
                }

                if (widgetType !== "Monitor") {
                    setSelectedWidget(widgetType);
                    setDropAreaIndex(index + 1);
                    setSide(side); // Set the side for form submission
                    setShowIssueModal(true); // Open issue modal when widget is dropped
                }

                sendWidgetData(widgetType, index + 1, side);
            } else {
                console.log("Please drop a Monitor first before dropping other widgets.");
            }
        } else {
            console.log(`${widgetType} has already been added to this drop area.`);
        }
    }

    function hasMonitor(index, side) {
        return isWidgetAlreadyDropped(index, side, "Monitor");
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function closeModals() {
        setShowWidgetModal(false);
        setShowIssueModal(false);
        setIssueCategory("");
        setSpecificIssue("");
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
        console.log(`Category: ${issueCategory}, Specific Issue: ${specificIssue}`);

        if (!issueCategory || !specificIssue) {
            alert("Please fill out all fields.");
            return;
        }

        sendFormData();
        closeModals();
    }

    async function sendWidgetData(widgetType, dropAreaIndex, side) {
        const widgetKey = `${widgetType}-${dropAreaIndex}-${side}`;

        if (savedWidgets.has(widgetKey)) {
            console.log("Widget already saved.");
            return;
        }

        if(widgetType == "Hardware Issue"){
            widgetType = null;
        }else if(widgetType == "Software Issue"){
            widgetType = null;
        }else if(widgetType == "Network Issue"){
            widgetType = null;
        }else{
            widgetType = "Monitor";
        }

        try {
            await axiosClient.post("/widgets", {
                widget_type: widgetType,
                drop_area_index: dropAreaIndex,
                side: side,
            });
        } catch (error) {
            console.error("Error saving widget data:", error);
        }
    }

    async function sendFormData() {
        const widgetKey = `${selectedWidget}-${dropAreaIndex}-${side}`;

        if (savedWidgets.has(widgetKey)) {
            console.log("Widget form data already saved.");
            return;
        }

        try {
            await axiosClient.post("/widgets", {
                widget_type: selectedWidget,
                drop_area_index: dropAreaIndex,
                issue_category: issueCategory,
                specific_issue: specificIssue,
                side: side,
            });

            setSavedWidgets((prev) => new Set(prev).add(widgetKey));
        } catch (error) {
            console.error("Error saving form data:", error);
        }
    }

    async function handleDeleteWidget(widgetType) {
        if (!dropAreaIndex || !side) {
            console.error("Drop area index or side is undefined.");
            return;
        }
    
        try {
            // Make DELETE request to backend
            await axiosClient.delete(`/widgets`, {
                data: {
                    widget_type: widgetType,
                    drop_area_index: dropAreaIndex,
                    side: side,
                },
            });
    
            // Update the state to remove the widget
            if (side === "left") {
                setDropAreasLeft((prev) => {
                    const newAreas = [...prev];
                    newAreas[dropAreaIndex - 1] = newAreas[dropAreaIndex - 1].filter(
                        (widget) => widget !== widgetType
                    );
                    return newAreas;
                });
            } else {
                setDropAreasRight((prev) => {
                    const newAreas = [...prev];
                    newAreas[dropAreaIndex - 1] = newAreas[dropAreaIndex - 1].filter(
                        (widget) => widget !== widgetType
                    );
                    return newAreas;
                });
            }
    
            // Clear saved issue details
            setIssueCategory("");
            setSpecificIssue("");
    
            // Close the modal
            closeModals();
        } catch (error) {
            console.error("Error deleting widget:", error);
        }
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
                <div className="col-3">
                    <h5 className="text-center">PC</h5>
                    {["Monitor"].map((widgetType) => (
                        <div
                            className="card text-center mb-2"
                            key={widgetType}
                            draggable
                            onDragStart={(e) => handleOnDrag(e, widgetType)}
                        >
                            <div className="card-body">
                                {renderWidgetSVG(widgetType)}
                                <p>{widgetType}</p>
                            </div>
                        </div>
                    ))}
                    <h5 className="text-center">PC Issue</h5>
                    {["Hardware Issue", "Software Issue", "Network Issue"].map((widgetType) => (
                        <div
                            className="card text-center mb-2"
                            key={widgetType}
                            draggable
                            onDragStart={(e) => handleOnDrag(e, widgetType)}
                        >
                            <div className="card-body">
                                {renderWidgetSVG(widgetType)}
                                <p>{widgetType}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-4">
                    <h5 className="text-center"></h5>
                    <div className="drop-area-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                        {dropAreasLeft.map((widgets, index) => (
                            <div
                                className="drop-area border p-2 d-flex flex-column"
                                key={index}
                                onDrop={(e) => handleOnDrop(e, index, "left")}
                                onDragOver={handleDragOver}
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
                                            onClick={() => handleWidgetClick(widget, index, "left")} // Add the onClick handler here
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
                    <h5 className="text-center"></h5>
                    <div className="drop-area-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                        {dropAreasRight.map((widgets, index) => (
                            <div
                                className="drop-area border p-2 d-flex flex-column"
                                key={index}
                                onDrop={(e) => handleOnDrop(e, index, "right")}
                                onDragOver={handleDragOver}
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
                                            onClick={() => handleWidgetClick(widget, index, "right")} // Add the onClick handler here
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

            {/* Modal for Issue Form */}
            <div className={`modal fade ${showIssueModal ? "show" : ""}`} style={{ display: showIssueModal ? "block" : "none" }} id="issueModal" tabIndex="-1" aria-labelledby="issueModalLabel" aria-hidden={!showIssueModal}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="issueModalLabel">Submit an Issue for {selectedWidget}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModals}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="issueCategory" className="form-label">Issue Category</label>
                                    <div className="form-group">
                            <label>What is the category of the issue you've been experiencing?</label>
                            <select
                                className="form-control"
                                value={issueCategory}
                                onChange={(e) => setIssueCategory(e.target.value)}
                                required
                            >
                                <option value="">Select an issue category</option>
                                {selectedWidget === "Hardware Issue" && (
                                    <>
                                        <option value="Power Supply">Power Supply</option>
                                        <option value="Hard Drive">Hard Drive</option>
                                        <option value="Motherboard">Motherboard</option>
                                    </>
                                )}
                                {selectedWidget === "Software Issue" && (
                                    <>
                                        <option value="Installation">Installation</option>
                                        <option value="Compatibility">Compatibility</option>
                                        <option value="Performance">Performance</option>
                                    </>
                                )}
                                {selectedWidget === "Network Issue" && (
                                    <>
                                        <option value="Connection">Connection</option>
                                        <option value="Speed">Speed</option>
                                        <option value="Signal">Signal</option>
                                    </>
                                )}
                            </select>
                        </div>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="specificIssue" className="form-label">Specific Issue</label>
                                    <textarea
                                        id="specificIssue"
                                        value={specificIssue}
                                        onChange={(e) => setSpecificIssue(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter Specific Issue"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit Issue</button>
                            </form>
                        </div>
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
                        <div className="modal-footer">
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteWidget(selectedWidget)}
                            >
                                Delete Widget
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default health_tech_lab1;

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import axiosClient from "./axiosClient";
import monitor from "./assets/tech/monitor.svg";
import hardware from "./assets/tech/hardware.svg";
import software from "./assets/tech/software.svg";
import network from "./assets/tech/network.svg";

function DragAndDrop() {
    const [dropAreasLeft, setDropAreasLeft] = useState(Array(16).fill([])); // 4x4 grid
    const [dropAreasRight, setDropAreasRight] = useState(Array(12).fill([])); // 3x4 grid
    const [showModal, setShowModal] = useState(false);
    const [selectedWidget, setSelectedWidget] = useState(null);
    const [dropAreaIndex, setDropAreaIndex] = useState(null); // Track drop area index

    useEffect(() => {
        async function fetchWidgetData() {
            try {
                const response = await axiosClient.get("/widgets");
                const data = response.data;

                // Populate the drop areas based on fetched data
                const left = Array(16).fill([]);
                const right = Array(12).fill([]);

                data.forEach(widget => {
                    if (widget.drop_area_index && widget.widget_type) {
                        if (widget.drop_area_index <= 16) {
                            left[widget.drop_area_index - 1] = [...left[widget.drop_area_index - 1], widget.widget_type];
                        } else {
                            right[widget.drop_area_index - 17] = [...right[widget.drop_area_index - 17], widget.widget_type];
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

    // Form inputs for the modal
    const [issueCategory, setIssueCategory] = useState("");
    const [specificIssue, setSpecificIssue] = useState("");

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
        const isAlreadyDropped = isWidgetAlreadyDropped(index, side, widgetType);

        if (!isAlreadyDropped) {
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

                if (widgetType !== "Monitor") { // Show modal only for issue widgets
                    setSelectedWidget(widgetType);
                    setDropAreaIndex(index + 1); // Set drop area number (1-based)
                    setShowModal(true);
                }

                // Send data to the backend
                sendWidgetData(widgetType, index + 1); // Send drop area index as 1-based
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

    function closeModal() {
        setShowModal(false);
        // Reset form when closing modal
        setIssueCategory("");
        setSpecificIssue("");
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        console.log(`Category: ${issueCategory}, Specific Issue: ${specificIssue}`);
        
        // Send form data to the backend
        sendFormData();

        // Close modal after submission
        closeModal();
    }

    async function sendWidgetData(widgetType, dropAreaIndex) {
        try {
            await axiosClient.post("/widgets", {
                widget_type: widgetType,
                drop_area_index: dropAreaIndex,
            });
        } catch (error) {
            console.error("Error saving widget data:", error);
        }
    }

    async function sendFormData() {
        try {
            await axiosClient.post("/widgets", {
                widget_type: selectedWidget,
                drop_area_index: dropAreaIndex,
                issue_category: issueCategory,
                specific_issue: specificIssue,
            });
        } catch (error) {
            console.error("Error saving form data:", error);
        }
    }

    function renderWidgetSVG(widgetType) {
        switch (widgetType) {
            case "Monitor":
                return <img src={monitor} alt="Monitor" />;
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
                    <h5 className="text-center">Draggable Icons</h5>
                    {["Monitor", "Hardware Issue", "Software Issue", "Network Issue"].map((widgetType) => (
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
                    <h5 className="text-center">Left Drop Area (4x4)</h5>
                    <div className="drop-area-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                        {dropAreasLeft.map((widgets, index) => (
                            <div
                                className="drop-area border p-2"
                                key={index}
                                onDrop={(e) => handleOnDrop(e, index, "left")}
                                onDragOver={handleDragOver}
                                style={{ minHeight: "100px" }}
                            >
                                {widgets.map((widget, i) => (
                                    <div key={i} className="d-flex align-items-center justify-content-center">
                                        {renderWidgetSVG(widget)}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-4">
                    <h5 className="text-center">Right Drop Area (3x4)</h5>
                    <div className="drop-area-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                        {dropAreasRight.map((widgets, index) => (
                            <div
                                className="drop-area border p-2"
                                key={index}
                                onDrop={(e) => handleOnDrop(e, index, "right")}
                                onDragOver={handleDragOver}
                                style={{ minHeight: "100px" }}
                            >
                                {widgets.map((widget, i) => (
                                    <div key={i} className="d-flex align-items-center justify-content-center">
                                        {renderWidgetSVG(widget)}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for Form */}
            {showModal && (
                <div className="modal show" style={{ display: 'block' }} onClick={closeModal}>
                    <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedWidget} Details</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="form-group">
                                        <label>What is the category of the issue you've been experiencing?</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={issueCategory}
                                            onChange={(e) => setIssueCategory(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>What specific issue have you experienced?</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={specificIssue}
                                            onChange={(e) => setSpecificIssue(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DragAndDrop;

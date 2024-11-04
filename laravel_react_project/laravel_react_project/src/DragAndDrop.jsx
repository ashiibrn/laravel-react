import { useState } from "react";
import monitor from "./assets/tech/monitor.svg";
import hardware from "./assets/tech/hardware.svg";
import software from "./assets/tech/software.svg";
import network from "./assets/tech/network.svg";

function DragAndDrop() {
    const [dropAreasLeft, setDropAreasLeft] = useState(Array(16).fill([])); // 4x4 grid
    const [dropAreasRight, setDropAreasRight] = useState(Array(12).fill([])); // 4x3 grid
    const [showModal, setShowModal] = useState(false);
    const [selectedWidget, setSelectedWidget] = useState(null);

    // Check if a monitor or any widget is already in the specified drop area
    const isWidgetAlreadyDropped = (index, side, widgetType) => {
        if (side === "left") {
            return dropAreasLeft[index].includes(widgetType);
        } else {
            return dropAreasRight[index].includes(widgetType);
        }
    };

    function handleOnDrag(e, widgetType) {
        e.dataTransfer.setData("widgetType", widgetType);
    }

    function handleOnDrop(e, index, side) {
        e.preventDefault();
        const widgetType = e.dataTransfer.getData("widgetType");

        // Check if dropping the widget is allowed
        const isAlreadyDropped = isWidgetAlreadyDropped(index, side, widgetType);

        // Allow dropping if the widget is not already dropped in the area
        if (!isAlreadyDropped) {
            if (widgetType === "Monitor" || (hasMonitor(index, side))) {
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
                setSelectedWidget(widgetType);
                setShowModal(true);
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
                    <h5 className="text-center">Right Drop Area (4x3)</h5>
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

            {showModal && (
                <div className="modal show" style={{ display: 'block' }} onClick={closeModal}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Icon Dropped</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>{selectedWidget} has been added to a drop area.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DragAndDrop;

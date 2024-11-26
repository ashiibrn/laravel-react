import React, { useState } from 'react';
import DragAndDrop from './DragAndDrop.jsx';
import App from './App.jsx';

function Tabs() {
    // State to track the currently selected tab
    const [activeTab, setActiveTab] = useState('DragAndDrop');

    // Function to render the content based on the active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'DragAndDrop':
                return <DragAndDrop />;
            case 'App':
                return <App />;
            default:
                return <DragAndDrop />;
        }
    };

    return (
        <div>
            {/* Tab Buttons */}
            <div className="tabs">
                <button onClick={() => setActiveTab('DragAndDrop')}>Home</button>
                <button onClick={() => setActiveTab('App')}>About</button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default Tabs;

import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

export default function ChatMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [receiverId, setReceiverId] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = () => {
        setLoading(true);
        axiosClient
            .get("/chats")
            .then(({ data }) => {
                setLoading(false);
                setMessages(data.data);
            })
            .catch((error) => {
                setLoading(false);
                console.error("There was an error fetching the messages!", error);
            });
    };

    const onDeleteClick = (message) => {
        if (!window.confirm("Are you sure you want to delete this message?")) {
            return;
        }
        axiosClient
            .delete(`/chats/${message.id}`)
            .then(() => {
                fetchMessages();
            })
            .catch(error => {
                console.error("There was an error deleting the message!", error);
            });
    };

    const handleSendMessage = () => {
        if (!newMessage) return;

        axiosClient
            .post("/chats", { message: newMessage, receiver_id: receiverId })
            .then(() => {
                setNewMessage("");
                setReceiverId(null);
                fetchMessages();
            })
            .catch(error => {
                console.error("There was an error sending the message!", error);
            });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Chat Messages</h1>
                <button style={styles.refreshButton} onClick={fetchMessages}>Refresh</button>
            </div>
            <div style={styles.chatBox}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>ID</th>
                            <th style={styles.tableHeader}>Sender</th>
                            <th style={styles.tableHeader}>Receiver</th>
                            <th style={styles.tableHeader}>Message</th>
                            <th style={styles.tableHeader}>Actions</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <tbody>
                            <tr>
                                <td colSpan="5" style={styles.loadingText}>Loading...</td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {messages.map((msg) => (
                                <tr key={msg.id} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{msg.id}</td>
                                    <td style={styles.tableCell}>{msg.sender?.name || "Unknown"}</td>
                                    <td style={styles.tableCell}>{msg.receiver?.name || "Group/Unknown"}</td>
                                    <td style={styles.tableCell}>{msg.message}</td>
                                    <td style={styles.tableCell}>
                                        <button style={styles.deleteButton} onClick={() => onDeleteClick(msg)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>

            <div style={styles.sendMessageArea}>
                <textarea
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    style={styles.textarea}
                />
                <input
                    type="number"
                    placeholder="Receiver ID (optional)"
                    value={receiverId || ""}
                    onChange={(e) => setReceiverId(e.target.value ? parseInt(e.target.value, 10) : null)}
                    style={styles.receiverInput}
                />
                <button style={styles.sendButton} onClick={handleSendMessage}>Send Message</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#333', // Dark gray for better readability
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#2E3B4E', // Darker shade for title
    },
    refreshButton: {
        padding: '8px 16px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    chatBox: {
        maxHeight: '300px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        color: '#2E3B4E', // Table text color for better contrast
    },
    tableHeader: {
        padding: '10px',
        backgroundColor: '#E3E9F0', // Light background for header
        fontWeight: 'bold',
        borderBottom: '1px solid #ddd',
        color: '#2E3B4E', // Dark text color for headers
    },
    tableRow: {
        backgroundColor: '#F9FAFB', // Light gray row background
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        padding: '10px',
        textAlign: 'center',
        color: '#555', // Medium gray for cell text
    },
    loadingText: {
        padding: '10px',
        textAlign: 'center',
        color: '#999', // Light gray for loading text
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#FF5C5C',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    sendMessageArea: {
        marginTop: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
    },
    textarea: {
        width: '100%',
        minHeight: '60px',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        color: '#2E3B4E', // Dark text color for input
    },
    receiverInput: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        color: '#2E3B4E', // Dark text color for input
    },
    sendButton: {
        padding: '10px 16px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
        transition: 'background-color 0.3s',
    },
};

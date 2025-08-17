import React, { useState } from 'react';
import PassRequestForm from './components/PassRequestForm';
import PassRequestList from './components/PassRequestList';
import './styles.css';

const App = () => {
    const [requests, setRequests] = useState([]);

    const addRequest = async (request) => {
        try {
            const response = await fetch('http://localhost:5000/submit-pass-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.text();
            alert(data); // Show success message
            setRequests([...requests, request]); // Update local state
        } catch (error) {
            console.error('Error submitting request:', error);
            alert('Failed to submit request');
        }
    };

    return (
        <div className="app">
            <h1>Hostel Pass Management System</h1>
            <PassRequestForm addRequest={addRequest} />
            <h2>Pass Requests</h2>
            <PassRequestList requests={requests} />
        </div>
    );
};

export default App;


import React, { useState } from 'react';

const PassRequestForm = ({ addRequest }) => {
    const [name, setName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [reason, setReason] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addRequest({ name, roomNumber, reason });
        setName('');
        setRoomNumber('');
        setReason('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Room Number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
            />
            <button type="submit">Request Pass</button>
        </form>
    );
};

export default PassRequestForm;

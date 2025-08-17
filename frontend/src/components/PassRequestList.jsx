import React from 'react';

const PassRequestList = ({ requests }) => {
    return (
        <ul>
            {requests.map((request, index) => (
                <li key={index}>
                    {request.name} (Room: {request.roomNumber}) - Reason: {request.reason}
                </li>
            ))}
        </ul>
    );
};

export default PassRequestList;

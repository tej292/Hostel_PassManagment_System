const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://tejpratapsingh2459:AFApZn7ApZyHVZ1y@cluster2.rq3fabk.mongodb.net/hostelPassManagement?retryWrites=true&w=majority&appName=Cluster2';

mongoose.connect(mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Mongoose schema
const passRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    roomNumber: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const PassRequest = mongoose.model('PassRequest', passRequestSchema);

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tejpratapsingh2459@gmail.com',
        pass: 'krqy gyar odlo becz'  // ⚠️ move this into .env before deploying
    }
});

// API route to submit pass request
app.post('/api/submit-pass-request', async (req, res) => {
    try {
        const { name, roomNumber, reason } = req.body;

        if (!name || !roomNumber || !reason) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newRequest = new PassRequest({ name, roomNumber, reason });
        await newRequest.save();

        const mailOptions = {
            from: 'Hostel Pass System <tejpratapsingh2459@gmail.com>',
            to: 'ns1501592@gmail.com',
            subject: `New Pass Request from ${name}`,
            html: `
                <h3>New Hostel Pass Request</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Room Number:</strong> ${roomNumber}</p>
                <p><strong>Reason:</strong> ${reason}</p>
                <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            message: 'Pass request submitted successfully',
            requestId: newRequest._id
        });

    } catch (error) {
        console.error('Error submitting request:', error);
        res.status(500).json({ 
            error: 'Failed to process request',
            details: error.message 
        });
    }
});

// ✅ Serve React Vite build (inside public/dist)
app.use(express.static(path.join(__dirname, 'public/dist')));

// ✅ Catch-all route: send React index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});


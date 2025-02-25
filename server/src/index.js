const express = require('express');
const cors = require('cors');
// const { connectToDb } = require('./db/connection');

// Import routes
const routes = require('./routes');
// const chatRoutes = require('./routes/chatRoutes');  // Uncomment as you create these

const app = express();
const PORT = process.env.PORT || 3001; // Use 3001 to avoid conflicts with common frontend ports

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// API routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
async function startServer() {
  try {
    // await connectToDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

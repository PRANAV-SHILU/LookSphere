// Global error handling utilities for production stability

/**
 * Setup comprehensive error handlers for the application
 * @param {Object} app - Express application instance
 */
export const setupErrorHandlers = (app) => {
  // Handle JSON syntax errors
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error("JSON Syntax Error:", err);
      return res.status(400).json({ error: "Invalid JSON format" });
    }
    next();
  });

  // Comprehensive error handler
  app.use((err, req, res, next) => {
    console.error("Express Error:", {
      message: err.message,
      stack: err.stack,
      name: err.name,
      status: err.status
    });

    // Handle specific error types
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    if (err.code === 11000) {
      return res.status(400).json({ error: 'Duplicate field value entered' });
    }

    // Default error response
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      error: process.env.NODE_ENV === 'production' 
        ? "Internal server error. Kindly check backend logs or try again later!"
        : err.message
    });
  });

  // Global uncaught exception handler
  process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION! Shutting down...", {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    setTimeout(() => process.exit(1), 1000);
  });

  // Global unhandled rejection handler
  process.on("unhandledRejection", (reason, promise) => {
    console.error("UNHANDLED REJECTION! Shutting down...", {
      reason: reason,
      promise: promise
    });
    setTimeout(() => process.exit(1), 1000);
  });

  // Graceful shutdown handlers
  const gracefulShutdown = (signal) => {
    console.log(`${signal} received. Starting graceful shutdown...`);
    setTimeout(() => {
      console.log("Shutdown complete. Exiting...");
      process.exit(0);
    }, 1000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
};

/**
 * Start server with error handling
 * @param {Object} app - Express application instance
 * @param {string} port - Port number to listen on
 */
export const startServerWithErrorHandling = (app, port) => {
  try {
    const server = app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    // Handle server errors
    server.on('error', (err) => {
      console.error("Server error:", err);
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
      }
      process.exit(1);
    });

    return server;
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

/**
 * Wrap async function calls in try-catch for startup errors
 * @param {Function} fn - Async function to execute
 * @param {string} errorMessage - Error message to display on failure
 */
export const safeAsyncCall = async (fn, errorMessage) => {
  try {
    await fn();
  } catch (err) {
    console.error(errorMessage, err);
    process.exit(1);
  }
};

/**
 * Retry async function with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {number} retryCount - Maximum retry attempts (default: 5)
 * @param {number} initialDelay - Initial delay in milliseconds (default: 5000)
 * @param {string} operationName - Name of operation for logging (default: "Operation")
 */
export const retryWithBackoff = async (fn, retryCount = 5, initialDelay = 5000, operationName = "Operation") => {
  let attempts = 0;
  let delay = initialDelay;
  
  while (attempts < retryCount) {
    try {
      return await fn();
    } catch (error) {
      attempts++;
      console.error(`${operationName} attempt ${attempts}/${retryCount} failed:`, error.message);
      
      if (attempts >= retryCount) {
        console.error(`Max retry attempts reached for ${operationName}. Exiting...`);
        throw error;
      }
      
      console.log(`Retrying ${operationName} in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      // Exponential backoff
      delay = Math.min(delay * 2, 30000); // Max 30 seconds
    }
  }
};

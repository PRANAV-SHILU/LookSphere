// Simplified error handling for portfolio backend

/**
 * Setup basic error handlers for the application
 * @param {Object} app - Express application instance
 */
export const setupErrorHandlers = (app) => {
  // Basic error handler
  app.use((err, req, res, next) => {
    console.error("Express Error:", err.message);
    res.status(500).json({
      error: "Internal server error. Kindly check backend logs or try again later!",
    });
  });

  // Global uncaught exception handler
  process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION! Shutting down...", err);
    setTimeout(() => process.exit(1), 1000);
  });

  // Global unhandled rejection handler
  process.on("unhandledRejection", (reason) => {
    console.error("UNHANDLED REJECTION! Shutting down...", reason);
    setTimeout(() => process.exit(1), 1000);
  });
};

/**
 * Start server with error handling
 * @param {Object} app - Express application instance
 * @param {string} port - Port number to listen on
 */
export const startServerWithErrorHandling = (app, port) => {
  try {
    const server = app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });

    // Handle server errors
    server.on("error", (err) => {
      console.error("Server error:", err);
      if (err.code === "EADDRINUSE") {
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
 * Retry async function with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {number} retryCount - Maximum retry attempts (default: 5)
 * @param {number} initialDelay - Initial delay in milliseconds (default: 5000)
 * @param {string} operationName - Name of operation for logging (default: "Operation")
 */
export const retryWithBackoff = async (
  fn,
  retryCount = 5,
  initialDelay = 5000,
  operationName = "Operation",
) => {
  let attempts = 0;
  let delay = initialDelay;

  while (attempts < retryCount) {
    try {
      return await fn();
    } catch (error) {
      attempts++;
      console.error(
        `${operationName} attempt ${attempts}/${retryCount} failed:`,
        error.message,
      );

      if (attempts >= retryCount) {
        console.error(`Max retry attempts reached for ${operationName}`);
        throw error;
      }

      console.log(`Retrying ${operationName} in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      // Exponential backoff
      delay = Math.min(delay * 2, 30000); // Max 30 seconds
    }
  }
};

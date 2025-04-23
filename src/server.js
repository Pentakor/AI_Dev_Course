import app from './app.js';
/**
 * Application entry point.
 * 
 * Starts the Express server on the specified port.
 */
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
})();

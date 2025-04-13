import dotenv from 'dotenv';
dotenv.config();
import app from './app'; // Import the app instance

//const app = express();
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

import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.database_url as string);
    console.log('Connected to MongoDB successfully');

    // Start the Express server
    app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('Failed to connect to MongoDB:', err);
  }
}

main();

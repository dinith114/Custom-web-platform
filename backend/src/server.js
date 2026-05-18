const app = require('./app');
const config = require('./config');
const connectDB = require('./config/db');

const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  // Start Express server
  app.listen(config.port, () => {
    console.log(`\n🚀 Server running in ${config.nodeEnv} mode on port ${config.port}`);
    console.log(`   Health check: http://localhost:${config.port}/api/health\n`);
  });
};

startServer();

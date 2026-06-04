const app = require("./app");
const config = require("./config");
const connectDB = require("./config/db");
const { seedDefaultTemplates } = require("./modules/templates/template.seed");

const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  try {
    await seedDefaultTemplates();
  } catch (error) {
    console.warn(`[Templates] Seeding skipped: ${error.message}`);
  }

  // Start Express server
  app.listen(config.port, () => {
    console.log(
      `\n🚀 Server running in ${config.nodeEnv} mode on port ${config.port}`,
    );
    console.log(
      `   Health check: http://localhost:${config.port}/api/health\n`,
    );
  });
};

startServer();

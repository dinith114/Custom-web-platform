const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("./config");
const errorHandler = require("./middleware/errorHandler");
const { errorResponse } = require("./utils/responseHelper");

const app = express();

// ==============================
// Global Middleware
// ==============================
app.use(helmet());
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// HTTP request logger (dev only)
if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// ==============================
// API Routes
// ==============================

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
    environment: config.nodeEnv,
  });
});

// Backend Dev 1 modules
app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use("/api/sites", require("./modules/sites/site.routes"));
app.use(
  "/api/sites/:siteId/navigation",
  require("./modules/navigation/navigation.routes"),
);
app.use(
  "/api/sites/:siteId/members",
  require("./modules/members/member.routes"),
);

// Admin module
app.use("/api/admin", require("./modules/admin/admin.routes"));

// Backend Dev 2 modules
app.use("/api/sites/:siteId/pages", require("./modules/pages/page.routes"));
app.use("/api/sites/:siteId/media", require("./modules/media/media.routes"));
// app.use('/api/public', require('./modules/public/public.routes'));
// app.use('/api/templates', require('./modules/templates/template.routes'));

// ==============================
// 404 Handler
// ==============================
app.use((req, res) => {
  res.status(404).json(errorResponse(`Route not found: ${req.originalUrl}`));
});

// ==============================
// Global Error Handler (must be last)
// ==============================
app.use(errorHandler);

module.exports = app;

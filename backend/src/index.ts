import express from "express";
import cors from "cors";
import quoteRoutes from "./routes/quote.js";


// Global error handlers
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  process.exit(1);
});


process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
});

const app = express();

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

app.use("/quote", quoteRoutes);

// Health check — useful
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = Number(process.env["PORT"] ?? 3001);

app.listen(PORT, () => {
  console.log(`\n  FX Quote API  →  http://localhost:${PORT}\n`);
});
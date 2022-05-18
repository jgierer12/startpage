import "dotenv/config";
import cron from "node-cron";
import { execa } from "execa";
import express from "express";
import serve from "serve-handler";

const build = async () => {
  console.info("Building app...");
  const task = execa("npm", ["run", "build"]);
  task.stdout.pipe(process.stdout);
  return await task;
};

// ---- START ---- //
console.info("\n---- Running startup build ----");
await build();
console.info("---- Startup build complete ----\n");

// ---- CRON ---- //
cron.schedule(`0 ${process.env.REBUILD_HOUR} * * *`, async () => {
  console.info("\n---- Running scheduled rebuild ----");
  await build();
  console.info("---- Scheduled rebuild complete ----\n");
}, {
  scheduled: true,
  timezone: process.env.TIMEZONE
});

// ---- APP ---- //
const app = express();

app.get("/rebuild", async (req, res) => {
  console.info("\n---- Running requested rebuild ----");
  await build();
  console.info("---- Requested rebuild complete ----\n");
  res.send("Rebuild complete");
});

app.use("/", (req, res) => serve(req, res, {
  public: "./dist",
  cleanUrls: true,
}));

app.listen(3000);
console.info("\n---- Listening on http://localhost:3000 ----\n");

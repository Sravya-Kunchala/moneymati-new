const fs = require("fs");
const path = require("path");

const appDir = path.resolve(__dirname, "..");
const nextDir = path.join(appDir, ".next");

if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
}

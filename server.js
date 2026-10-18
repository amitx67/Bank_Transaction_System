const dns = require("node:dns");

// DNS resolvers used for MongoDB SRV lookups.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/db.js");

const port = process.env.PORT || 9000;

async function startServer() {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing from your .env file");
    }

    await connectToDB();

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();

import * as dotenv from "dotenv";
dotenv.config();

const config = {
  baseUrl: process.env.BASE_URL || "",
};

export default config;

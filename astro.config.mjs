import { defineConfig } from 'astro/config';
import path from "path";

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@config": process.env.NODE_ENV === "production" ? path.resolve("/config/config.json") : path.resolve("./config.json")
      }
    }
  }
});

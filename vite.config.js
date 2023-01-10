import { defineConfig } from "vite";
import netlifyEdge from "./src/index.ts";

export default defineConfig({
  plugins: [netlifyEdge()],
});

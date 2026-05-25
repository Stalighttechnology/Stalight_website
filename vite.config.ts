import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from "vite-plugin-sitemap";
import fs from "fs";

// Small helper plugin to ensure robots.txt is present in the build output
function ensureRobotsPlugin() {
  return {
    name: 'ensure-robots',
    generateBundle(options) {
      try {
        const outDir = options.dir || 'dist';
        const projectRoot = process.cwd();
        const src = path.resolve(projectRoot, 'public', 'robots.txt');
        const dest = path.resolve(projectRoot, outDir, 'robots.txt');
        if (fs.existsSync(src)) {
          fs.mkdirSync(path.dirname(dest), { recursive: true });
          fs.copyFileSync(src, dest);
        }
      } catch (err) {
        // non-fatal; sitemap plugin may still report if missing
        this.warn('ensure-robots plugin failed: ' + err);
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    ensureRobotsPlugin(),
    sitemap({
      hostname: "https://stalight.in",
      exclude: ["/googlefc67a6c63a16b977"],
      dynamicRoutes: [
        "/",
        "/neuro-campus",
        "/neuro-campus-access",
        "/neurosync",
        "/software-development",
        "/skill-development",
        "/it-services",
        "/about-us"
      ]
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
}));

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import svgr from 'vite-plugin-svgr'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
    registerType: "prompt",
    includeAssets: ["favicon.ico", "apple-touch-icon.png"],
    manifest: {
        name: "tuvu.vn",
        short_name: "tuvu.vn",
        description: "TUVU - Trải nghiệm học tập, làm việc liền mạch",
        icons: [
            {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "apple touch icon",
            },
            {
                src: "/android-chrome-192x192.png",
                sizes: "225x225",
                type: "image/png",
                purpose: "any maskable",
            },
        ],
        theme_color: "#171717",
        background_color: "#e8ebf2",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
    },
};


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), VitePWA(manifestForPlugin)],

    server: {
        host: '0.0.0.0',
        port: 3000
    },

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/"),
            components: `${path.resolve(__dirname, "./src/components/")}`,
            layout: `${path.resolve(__dirname, "./src/layout/")}`,
            utils: `${path.resolve(__dirname, "./src/utils/")}`,
            configs: `${path.resolve(__dirname, "./src/configs/")}`,
            contexts: `${path.resolve(__dirname, "./src/contexts/")}`,
            pages: path.resolve(__dirname, "./src/pages")
        }
    }
})

import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/sass/index.scss", "resources/js/main.jsx"],
            refresh: true,
        }),
    ],
});

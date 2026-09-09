import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js"

export const webRoutes = [
     { method: "GET", path: "/", config: dashboardController.index },
     { method: "GET", path: "/about", config: aboutController.index },
];

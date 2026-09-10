import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { mainController } from "./controllers/main-controller.js";

export const webRoutes = [
     { method: "GET", path: "/dashboard", config: dashboardController.index },
     { method: "GET", path: "/about", config: aboutController.index },
     { method: "GET", path: "/", config: mainController.index },
];

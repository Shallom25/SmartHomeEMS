import express from "express";
import cors from "cors";
const app = express();
import energyRoutes from "./routes/energy.routes.js";
import devicesRoutes from "./routes/devices.routes.js";
import alertsRoutes from "./routes/alerts.routes.js";
import settingsRoutes from "./routes/settings.routes.js"
import usersRoutes from "./routes/users.routes.js"


app.use(cors());
app.use(express.json());

app.use("/api/energy", energyRoutes);

app.use("/api/devices", devicesRoutes);

app.use("/api/alerts", alertsRoutes);

app.use("/api/settings", settingsRoutes);

app.use("/api/users", usersRoutes);

export default app;
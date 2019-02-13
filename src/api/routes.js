// This file is where all the route/controller mappings occur

import { Router } from "express";
import connectionController from "./controllers/connectionController";

let router = Router();

router.use("/connection", connectionController);

export default router;

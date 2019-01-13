// This file is where all the route/controller mappings occur

import { Router } from "express";
import dataSourceController from "./controllers/dataSourceController";

let router = Router();

router.use("/datasource", dataSourceController);

export default router;

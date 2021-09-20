import { Router } from "express";
import * as area_controller from "../controllers/area";

import { ensureAuth } from "../middlewares/md_authenticated";

const router = Router();

router
.post("/createArea",ensureAuth, area_controller.createArea)
.delete("/deleteArea/:id",ensureAuth, area_controller.deleteArea)
.put("/updateArea/:id", ensureAuth, area_controller.updateArea)
.get("/getArea/:id",ensureAuth, area_controller.getAreaId)
.get("/getAreas",ensureAuth, area_controller.getAreas)

export default router;

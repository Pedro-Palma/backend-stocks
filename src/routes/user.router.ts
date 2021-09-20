import { Router } from "express";
import * as user_controller from "../controllers/user";

import { ensureAuth } from "../middlewares/md_authenticated";
const router = Router();

router
  .get("/getUser/:id", ensureAuth, user_controller.getUserId)
  .get("/getUsers", ensureAuth, user_controller.getUsers)
  .post("/createUser", user_controller.createUser)
  .post("/login", user_controller.login)
  .delete("/deleteUser/:id", ensureAuth, user_controller.deleteUser)
  .put("/updateUser/:id", ensureAuth, user_controller.updateUser)
  
export default router;

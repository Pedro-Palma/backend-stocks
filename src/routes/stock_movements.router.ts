import { Router } from "express";
import * as stock_movements_controller from "../controllers/stock_movements";

import { ensureAuth } from "../middlewares/md_authenticated";
import stock_movements from "../models/stock_movements";
const router = Router();

router
  .post('/createStockMovement',ensureAuth, stock_movements_controller.createStockMovement)
  .get('/getStockMovements',ensureAuth, stock_movements_controller.getStockMovements)
  .get('/getStockMovement/:id',ensureAuth, stock_movements_controller.getStockMovementId)
  .put('/updateStockMovement/:id',ensureAuth, stock_movements_controller.updateStockMovement)
  .delete('/deleteStockMovement/:id',ensureAuth, stock_movements_controller.deleteStockMovement)



export default router;

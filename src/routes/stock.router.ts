import { Router } from "express";
import * as stock_controller from "../controllers/stock";

import { ensureAuth } from "../middlewares/md_authenticated";
const router = Router();
router
.post('/createStock',ensureAuth, stock_controller.createStock)
.get('/disableStock/:id',ensureAuth, stock_controller.disableStock)
.get('/getStock/:id',ensureAuth, stock_controller.getStockId)
.get('/getStocks',ensureAuth, stock_controller.getStocks)
.put('/updateStock/:id',ensureAuth, stock_controller.updateStock)
.delete('/deleteStock/:id',ensureAuth, stock_controller.deleteStock)



  
  
export default router;

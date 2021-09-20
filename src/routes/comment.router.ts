import { Router } from "express";
import * as comment_controller from "../controllers/comment"

import { ensureAuth } from "../middlewares/md_authenticated";
const router = Router();

router
.post('/createComment',ensureAuth,comment_controller.createComment)
.get('/getComments',ensureAuth,comment_controller.getComments)
.get('/getComment/:id',ensureAuth,comment_controller.getCommentId)
.put('/updateComment/:id',ensureAuth,comment_controller.updateComment)
.delete('/deleteComment/:id', ensureAuth, comment_controller.deleteComment)
  
export default router;

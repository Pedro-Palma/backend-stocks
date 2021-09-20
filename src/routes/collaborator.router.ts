import { Router } from "express";
import * as collaborator_controller from "../controllers/collaborator";

import { ensureAuth } from "../middlewares/md_authenticated";
const router = Router();

router
  .post('/createCollaborator',ensureAuth, collaborator_controller.createCollaborator)
  .get('/getCollaborator/:id',ensureAuth, collaborator_controller.getCollaboratorId)
  .get('/getCollaborators',ensureAuth, collaborator_controller.getCollaborators)
  .put('/updateCollaborator/:id',ensureAuth, collaborator_controller.updateCollaborator)
  .delete('/deleteCollaborator/:id',ensureAuth, collaborator_controller.deleteCollaborator)



export default router;

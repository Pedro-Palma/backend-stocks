import Collaborator from "../models/collaborator";
import Area from "../models/area";
import { Request, Response } from "express";

export const createCollaborator = async (req: Request, res: Response) => {
  try {
    const params = req.body;
    if (
      !params.first_name ||
      !params.last_name ||
      !params.email ||
      !params.cui ||
      !params.gender ||
      !params.idArea
    )
      return res
        .status(500)
        .send({ message: "Enter the requested parameters" });

    const collaboratorFound = await Collaborator.query().findOne({
      cui: params.cui,
    });
    if (collaboratorFound)
      return res.status(500).json({
        message: "There is already a registered collaborator with this CUI",
      });
    const collaboratorNew = {
      first_name: params.first_name,
      last_name: params.last_name,
      email: params.email,
      gender: params.gender,
      phone: params.phone,
      cui: params.cui,
      nit: params.nit,
      idArea: params.idArea,
    };
    const collaborator = await Collaborator.query().insert(collaboratorNew);
    return res.status(200).json(collaborator);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getCollaboratorId = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    if (!params.id)
      return res
        .status(500)
        .json({ message: "Enter the requested parameters" });
    const collaborator = await Collaborator.query().findById(params.id);
    if (!collaborator)
      return res
        .status(500)
        .json({ message: "There is no collaborator with the ID you entered" });
    return res.status(200).json({ collaborator });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getCollaborators = async (req: Request, res: Response) => {
  try {
    const collaborator = await Collaborator.query();
    if (!collaborator.length)
      return res
        .status(500)
        .json({ message: "There is no collaborator register" });
    return res.status(200).json({ collaborator });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateCollaborator = async (req: Request, res: Response) => {
  try {
    const params = req.body;

    const id = req.params.id;
    if (!id)
      return res
        .status(500)
        .send({ message: "Enter the requested parameters" });

    const collaboratorFound = await Collaborator.query().findOne({
      cui: params.cui,
    });
    if (collaboratorFound)
      return res.status(500).json({
        message: "There is already a registered collaborator with this CUI",
      });
    const collaboratorNew = {
      first_name: params.first_name,
      last_name: params.last_name,
      email: params.email,
      gender: params.gender,
      phone: params.phone,
      cui: params.cui,
      nit: params.nit,
      idArea: params.idArea,
    };
    const collaborator = await Collaborator.query()
      .findById(id)
      .patch(collaboratorNew);

    return res.status(200).json({ collaborator });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteCollaborator = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    if (!params.id)
      return res
        .status(500)
        .send({ message: "Enter the requested parameters" });

        const collaboratorDelete = await Collaborator.query().deleteById(params.id);
        if (!collaboratorDelete) 
        return res
          .status(500)
          .json({ message: "There is no area with the ID you entered" });
      return res.status(200).json(collaboratorDelete)
  } catch (err) {
    return res.status(500).json(err);

  }
};

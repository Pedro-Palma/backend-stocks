import Stock_movements from "../models/stock_movements";
import { Request, Response } from "express";

export const createStockMovement = async (req: Request, res: Response) => {
  try {
    const params = req.body;
    let idCollaboratorNew = params.idCollaborator;
    let status: string = "ASSIGNED_ACTIVED";

    if (!params.start_date || !params.finish_date)
      return res
        .status(500)
        .send({ message: "Enter the requested parameters" });

    if (!params.idCollaborator) {
      status = "DEASSIGNED";
    }
    if (idCollaboratorNew == "") {
      idCollaboratorNew = null;
      console.log(idCollaboratorNew);
    }
    // @ts-ignore
    const user = req.user;

    const stock_movementNew = {
      start_date: params.start_date,
      finish_date: params.finish_date,
      idUser: user,
      status: status,

      idCollaborator: idCollaboratorNew,
    };
    console.log(stock_movementNew);
    const stock_movements = await Stock_movements.query().insert(
      stock_movementNew
    );

    return res.send({ stock_movements });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

export const getStockMovements = async (req: Request, res: Response) => {
  try {
    const stock_movements = await Stock_movements.query();
    if (!stock_movements.length)
      return res
        .status(500)
        .send({ message: "There is no stock movements register " });
    return res.status(200).json({ stock_movements });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getStockMovementId = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const stock_movements = await Stock_movements.query().findById(params.id);
    if (!stock_movements)
      return res
        .status(500)
        .send({ message: "There is no stock movements register with that id" });
    return res.status(200).json({ stock_movements });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateStockMovement = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const params = req.body;
    let status:string;
    const stock_collaborator = Stock_movements.query().findById(id);

    if(!(await stock_collaborator).idCollaborator && params.idCollaborator){
        status = "ASSIGNED_ACTIVED";
        console.log('ola    ')
    } else{
        status = (await stock_collaborator).status;
    }
    
    const stock_movement_new = {
        start_date: params.start_date,
        finish_date: params.finish_date,
        idUser: params.idUser || undefined,
        idCollaborator: params.idCollaborator,
        status: status
    }
    
   
    const stock_movements = await Stock_movements.query().findById(id).patch(stock_movement_new);
    if (!stock_movements)
      return res
        .status(500)
        .send({ message: "There is no stock movements register with that id" });
    return res.status(200).json({ stock_movements });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteStockMovement = async (req: Request, res: Response) => {
    try {
        const params =  req.params;
        if(!params.id) return res.status(500).send({ message:'Enter the requested parameters'})
        const stock_movement = await Stock_movements.query().deleteById(params.id)
        if(!stock_movement) return res.status(500).send({ message:'No existing stock movements with that id '})
        return res.status(200).json({stock_movement})
    } catch (err) {
            return res.status(500).json(err);
    }
}

export const disableStockMovement = async (req: Request, res: Response) =>{
  try {
      
    const params = req.params;
    if (!params.id)
      return res
        .status(500)
        .send({ message: "Enter the requested parameters" });
    const stock_movements = await Stock_movements.query()
      .findById(params.id)
      .patch({ status: "DISABLED" });
    if (!stock_movements)
      return res
        .status(500)
        .json({ message: "There is no stock register with that id" });

    return res.status(200).json({ stock_movements });
      
  } catch (err) {
    return res.status(500).json(err);
  }
}
import Stock from "../models/stock";
import { Request, Response } from "express";

export const createStock = async (req: Request, res: Response) => {
  try {
    const params = req.body;
    if (!params.brand || !params.model || !params.serialNumber)
      return res
        .status(500)
        .json({ message: "Enter the requested parameters" });
    let status: string = "ACTIVE";
    if (!params.idStock_movements) {
      status = "DEASSIGNED";
    }
    const newStock = {
      brand: params.brand,
      model: params.model,
      serialNumber: params.serialNumber,
      status: status,
      idStock_movements: params.idStock_movements,
      idStock: params.idStock,
    };
    const stockFind = await Stock.query().findOne({
      serialNumber: params.serialNumber,
    });
    if (stockFind)
      return res.status(500).json({
        message: "There is already a registered stock with this serial number",
      });
    const stock = await Stock.query().insert(newStock);
    return res.status(200).send({ stock });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const disableStock = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    if (!params.id)
      return res
        .status(500)
        .send({ message: "Enter the requested parameters" });
    const stock = await Stock.query()
      .findById(params.id)
      .patch({ status: "DISABLED" });
    if (!stock)
      return res
        .status(500)
        .json({ message: "There is no stock register with that id" });

    const sonStocks = await Stock.query()
      .where({ idStock: params.id })
      .patch({ status: "DISABLED" });

    return res.status(200).json({ stock, sonStocks });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateStock = async (req: Request, res: Response) => {
  try {
    const params = req.body;
    const id = req.params.id;
    if (!id)
      return res
        .status(500)
        .send({ message: "Enter the requested parameters" });

    const stockFind = await Stock.query().where({serialNumber: params.serialNumber});
    if(stockFind.length > 0) return res.status(200).json({stockFind})
    const newStock = {
      brand: params.brand,
      model: params.model,
      serialNumber: params.serialNumber,
      idStock: params.idStock,
      idStock_movements: params.idStock_movements,
    };  
    
    const stock = await Stock.query().findById(id).patch(newStock)

    return res.status(200).json({stock})

  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getStockId = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    if (!params.id)
      return res
        .status(500)
        .send({ message: "Enter the requested parameters" });

    const stock = await Stock.query().findById(params.id);

    if (!stock)
      return res
        .status(500)
        .json({ message: "There is no stock with the ID you entered" });
    return res.status(200).json({ stock });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getStocks = async (req: Request, res: Response) => {
  try {
    const stock = await Stock.query();

    if (!stock) return res.status(500).json({ message: "No existing stocks" });
    return res.status(200).json({ stock });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteStock = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(500).send({ message:'Enter the requested parameters'});
    const stock = await Stock.query().deleteById(id)

    return res.status(200).json({ stock });

  } catch (err) {
  return res.status(500).json(err);
  }
}
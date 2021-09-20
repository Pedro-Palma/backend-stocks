import { Request, Response } from "express";
import Area from '../models/area'

export  const createArea = async (req: Request, res: Response)=>{
    try {
        const params = req.body;
        if(!params.name || !params.description) return res
        .status(500)
        .send({ message: 'Enter the requested parameters'})
         
   
         const areaFound = await Area.query().findOne({ name: params.name})
         if(areaFound) return res
         .status(500)
         .send({ message:'There is already a registered area with this name'})
      
   
        const  area  = await Area.query().insert({
          name: params.name,
          description: params.description
         });
   
   
        return res.send({ area})
    } catch (err) {
        return res.status(500).json(err)
    }
}

export  const deleteArea = async (req: Request, res: Response)=>{
    try {
        const id = req.params.id;
        if(!id) return res.status(500).send({ message:'Enter the requested parameters'})
        const areaDelete = await Area.query().deleteById(id);
        if (!areaDelete) 
          return res
            .status(500)
            .json({ message: "There is no area with the ID you entered" });
        return res.status(200).json(areaDelete)
      }catch (err) {
        return res.status(500).json(err);
      }
}

export  const updateArea = async (req: Request, res: Response)=>{
    try {
        const params = req.body;
        const id = req.params.id;
        if(!id) return res
        .status(500)
          .send({ message:'Enter the requested parameters'});
    
          const areaFound = await Area.query().findOne({ name: params.name });
          if(areaFound) return res
          .status(500)
          .send({ message:'There is already a registered area with this name'})
    
        const user = await Area.query().findById(id).patch({ 
          name: params.name,
          description: params.description,
        })
    
        if(!user) return res
        .status(500)
          .send({ message: "There is no area with the ID you entered" });
    
          return res.status(200).json(user);
    
      } catch (err) {
          return res.status(500).json(err);
    
      }
}

export const getAreaId = async (req: Request, res: Response)=>{
    try {
        if(!req.params.id) return res.status(500).send({ message:'Enter the requested parameters'})
        const { id } = req.params;
        const area = await Area.query().findById(id);
        if (!area)
          return res
            .status(500)
            .json({ message: "There is no area with the ID you entered" });
    
        return  res.status(200).json({area});
    
      } catch (err) {
        return res.status(500).json(err);
      }
}
export const getAreas = async (req: Request, res: Response)=>{
    try {
        
        const area = await Area.query();
        if (!area.length)
          return res
            .status(500)
            .json({ message: "No existing areas" });
    
        return  res.status(200).json({area});
    
      } catch (err) {
        return res.status(500).json(err);
      }
}
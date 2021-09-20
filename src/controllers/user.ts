import { Id } from "objection";
import { jwT } from "../service/jwt";
import * as bcrypt from "bcrypt-nodejs";
import User from "../models/user";
import { Request, Response } from "express";

export const getUserId = async (req: Request, res: Response) => {
  try {
    if(!req.params.id) return res.status(500).send({ message:'Enter the requested parameters'})
    const { id } = req.params;
    const user = await User.query().findById(id);
    if (!user)
      return res
        .status(500)
        .json({ message: "There is no user with the ID you entered" });

    return  res.status(200).json({user})

  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.query();
    if (!users.length)
      return res
        .status(500)
        .send({ message: "No existing users" });

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const createUser = async (req: Request, res: Response) => {
   try {
     const params = req.body;
     if(!params.first_name || !params.last_name || !params.email || !params.password) return res
     .status(500)
     .send({ message: 'Enter the requested parameters'})
      
     const password = await bcrypt.hashSync(params.password);

      const userFound = await User.query().findOne({ email: params.email})
      if(userFound) return res
      .status(500)
      .send({ message:'There is already a registered user with this email'})
   

     const  user  = await User.query().insert({
       first_name: params.first_name,
       last_name: params.last_name,
       email: params.email,
       password: password
      });


     return res.send({ user})

   } catch (err) {
    return res.status(500).json(err);
   }
};

export const login = async (req: Request, res: Response) => {
  try {
    const params = req.body;
    if(!params.email || !params.password) return res.status(500).send({ message:'Enter the requested parameters'})

    const user = await User.query().findOne({email: params.email});

    if (!user)
      return res
        .status(500)
        .json({ message: "There is no user with the ID you entered" });

        bcrypt.compare(params.password,user.password,(err,passCorrect) => {
          if(!passCorrect) return res.status(500).send({ message:'password incorrect' }); 

          return res.status(200).send(jwT(user)) 
        })

    

  }catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteUser = async (req:Request, res:Response) => {
  try {
    const id = req.params.id;
    if(!id) return res.status(500).send({ message:'Enter the requested parameters'})
    const userDelete = await User.query().deleteById(id);
    if (!userDelete) 
      return res
        .status(500)
        .json({ message: "There is no user with the ID you entered" });
    return res.status(200).json(userDelete)
  }catch (err) {
    return res.status(500).json(err);
  }
};

export const updateUser = async (req:Request, res:Response) => {
  try {
    const params = req.body;
    const id = req.params.id;
    if(!id) return res
    .status(500)
      .send({ message:'Enter the requested parameters'});

      const password = await bcrypt.hashSync(params.password);
      const userFound = await User.query().findOne({ email: params.email})
      if(userFound) return res
      .status(500)
      .send({ message:'There is already a registered user with this email'})

    const user = await User.query().findById(id).patch({ 
      first_name: params.first_name,
      last_name: params.last_name,
      email: params.email,
      password: password,
    })

    if(!user) return res
    .status(500)
      .send({ message: "There is no user with the ID you entered" });

      return res.status(200).json(user);

  } catch (err) {
      return res.status(500).json(err);

  }
}
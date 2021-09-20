//import { NextFunction, Response, Request } from "express";
import {Express} from "express";
import{ Request,Response,NextFunction} from "express";
import jwt from "jwt-simple";
import moment from "moment";
const pass = "passT";


export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
 // const newReq = Object.assign(req);
  if (!req.header("Authorization")) {
    return res
      .status(401)
      .send({ message: "The request does not have the authorization header" });
  }

  const token:string  = req.header("Authorization") as string;
   

  try {
    const payload = jwt.decode(token , pass);
    //expiracion
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        message: "The token expired",
      });
    }
    // @ts-ignore
    req.user = payload.sub as string;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "The token invalid",
    });
  }

  
};

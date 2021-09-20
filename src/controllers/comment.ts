import { Request, Response } from "express";
import { Comment } from "../models/comment";

export const createComment = async (req: Request, res: Response) => {
  try {
    const newDate = new Date();
    const params = req.body;
    if (!params.comment || !params.idStock_movements)
      return res
        .status(500)
        .json({ message: "Enter the requested parameters" });
    const newComment = {
      comment: params.comment,
      idStock_movements: params.idStock_movements,
      idStock: params.idStock,
      date: newDate,
    };
    const comment = await Comment.query().insert(newComment);
    return res.status(200).json({ comment });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getCommentId = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    if (!params.id)
      return res
        .status(500)
        .json({ message: "Enter the requested parameters" });

    const comment = await Comment.query().findById(params.id);
    if (!comment)
    return res
      .status(500)
      .json({ message: "They are no existing comment with with that id" });

      return res.status(200).json({ comment})
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.query();

    if (comment.length <= 0)
      return res
        .status(500)
        .json({ message: " They are no existing comments with that id" });

        return res.status(200).json({ comment})
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const params = req.body;

    if (!id)
      return res
        .status(500)
        .json({ message: "Enter Enter the requested parameters" });

    const newComment = {
      comment: params.comment,
      idStock_movements: params.idStock_movements,
      idStock: params.idStock,
    };
    const comment = await Comment.query().findById(id).patch(newComment);
    if (!comment)
      return res
        .status(500)
        .json({ message: "They are no existing comment with that id" });

        return res.status(200).json({ comment})
  } catch (err) {
      return res.status(500).json(err);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
try{
    const id = req.params.id;
    if(!id) return res.status(500).send({ message:'Enter the requested parameters'})
    const comment = await Comment.query().deleteById(id);
    if(!comment) return res.status(500).send({ message:'They are no existing comment with that id' });
    return res.status(200).json({ comment})

}catch (err) {

}
}
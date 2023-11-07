import { Response } from "express";

export const validateError = async (errors: any, res: Response) => {
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
};

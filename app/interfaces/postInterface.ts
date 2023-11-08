import { Request } from "express";
import { IUser } from "./userInterface";

export interface IPost {
  id: number | Number;
  title: string | null;
  published?: boolean;
  authorId?: any;
  author?: IUser;
}

export interface IPostRequest extends Request {
  title: string | null;
  published?: Boolean;
}

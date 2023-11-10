import { Request } from "express";
import { IUser } from "./userInterface";
import { IComment } from "./commentInterface";

export interface IPost {
  id: number | Number;
  title: string | null;
  published?: boolean;
  authorId?: any;
  author?: IUser;
  comment?: IComment;
}

export interface IPostRequest extends Request {
  title: string | null;
  published?: Boolean;
}

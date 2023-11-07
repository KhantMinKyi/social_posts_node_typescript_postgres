import { EnumType } from "typescript";
import { IPost } from "./postInterface";

export interface IUser {
  email: string;
  name: string;
  role: EnumType;
  authorId: number | Number;
  posts: IPost[];
}

export interface ILoginUser {
  email: string;
  password: string;
}
export interface IAuthUserBody {
  name: string;
  email: string;
  id: number | Number;
}
export interface IAuthUser extends Request {
  headers: any;
  user: IAuthUserBody; // Adjust the type of userId as needed
}

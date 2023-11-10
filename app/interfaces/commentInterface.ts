import { IPost } from "./postInterface";

export interface IComment {
  description: String | String;
  userId: number | Number | null;
  postId: number | Number | null;
  post?: IPost | null;
}

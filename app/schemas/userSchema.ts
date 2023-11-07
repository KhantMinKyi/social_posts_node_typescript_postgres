// import { TypeOf, object, string, z } from "zod";

// enum Role {
//   User = "user",
//   Author = "author",
// }

// export const createUserSchema = object({
//   body: object({
//     name: string({
//       required_error: "Name is Required",
//     }),
//     email: string({
//       required_error: "Email is Required",
//     }).email("Invalid Email address"),
//     password: string({
//       required_error: "Password Required",
//     })
//       .min(8, "password cannot be less than 8 ")
//       .max(32, "password cannot longer than 32"),
//     passwordConfirm: string({
//       required_error: "Please Confirm Password",
//     }),
//     role: z.optional(z.nativeEnum(Role)),
//   }).refine((data) => data.password == data.passwordConfirm, {
//     path: ["password Confirm"],
//     message: "password does not match",
//   }),
// });
// export const loginUserSchema = object({
//   body: object({
//     email: string({
//       required_error: "Email address is required",
//     }).email("Invalid email address"),
//     password: string({
//       required_error: "Password is required",
//     }).min(8, "Invalid email or password"),
//   }),
// });

// export type CreateUserInput = Omit<
//   TypeOf<typeof createUserSchema>["body"],
//   "passwordConfirm"
// >;

// export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];

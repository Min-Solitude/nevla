import * as z from "zod";

export const SignUpValidation = z.object({
  name: z.string().min(2, { message: "Tên quá ngắn" }),
  username: z.string().min(2, { message: "Tên quá ngắn" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(8, { message: "Mật khẩu ít nhất 8 ký tự" }),
});

export const SignInValidation = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(8, { message: "Mật khẩu ít nhất 8 ký tự" }),
});

export const PostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: "Caption quá ngắn" })
    .max(2200, { message: "Caption quá dài" }),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});

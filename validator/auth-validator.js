const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be of atleast 3 characters" })
    .max(255, { message: "Name must be atmost 255 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email format" })
    .trim()
    .min(3, { message: "Email must be of atleast 3 characters" })
    .max(255, { message: "Email must be atmost 255 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be of atleast 10 characters" })
    .max(1024, { message: "Password must be atmost 20 characters" }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email address" })
    .min(3, { message: "Email must be of atleat 3 characters" })
    .max(255, { message: "Email must be atmost 255 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be of atleat 7 characters" })
    .max(1024, { message: "Password must be atmost 20 characters" }),
});

module.exports = { signupSchema, loginSchema };

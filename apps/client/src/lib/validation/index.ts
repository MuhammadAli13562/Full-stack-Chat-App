import { z } from "zod"
import getCurrUsername from "../functions/getCurrUsername"

export const SignUpFormValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be atleast 3 characters" })
    .max(30, { message: "Name must not exceed 30 characters" }),
  email: z.string().email(),
  username: z
    .string()
    .min(6, { message: "username must be atleast 6 characters " })
    .max(20, { message: "username must not exceed 20 characters " })
    .regex(/^\S+$/, { message: "username cant have spaces" }),
  password: z
    .string()
    .min(6, { message: "password must be atleast 6 characters " })
    .max(30, { message: "password must not exceed 30 characters " }),
})

export const SignInFormValidation = z.object({
  username: z
    .string()
    .min(6, { message: "username must be atleast 6 characters " })
    .max(20, { message: "username must not exceed 20 characters " })
    .regex(/^\S+$/, { message: "username cant have spaces" }),

  password: z
    .string()
    .min(6, { message: "password must be atleast 6 characters " })
    .max(30, { message: "password must not exceed 30 characters " }),
})

export const addContactSchema = z
  .string()
  .min(6, { message: " " })
  .max(20, { message: " " })
  .regex(/^\S+$/, { message: "username cant have spaces" })
  .refine(usnm => usnm != getCurrUsername(), {
    message: "Cant add themselves as contact",
  })
